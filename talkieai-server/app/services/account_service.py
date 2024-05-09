# 导入json模块，用于处理json格式的数据
import json
# 导入os模块，用于处理操作系统相关的功能，如读写文件
import os
# 导入re模块，用于处理正则表达式相关的功能
import re
# 导入datetime模块，用于处理日期和时间相关的功能
import datetime

# 导入sqlalchemy.orm模块中的Session类，用于创建和管理数据库会话
from sqlalchemy.orm import Session

# 导入app.config模块中的Config类，用于获取配置信息
from app.config import Config
# 导入app.core模块中的auth和azure_voice，用于处理认证和Azure语音相关的功能
from app.core import auth, azure_voice
# 从app.core.azure_voice模块中导入所有的类和函数
from app.core.azure_voice import *
# 导入app.core.exceptions模块中的UserAccessDeniedException类，用于处理用户访问被拒绝的异常
from app.core.exceptions import UserAccessDeniedException
# 从app.core.utils模块中导入所有的类和函数
from app.core.utils import *
# 导入app.db.sys_entities模块中的所有类
from app.db.sys_entities import *
# 导入app.db.account_entities模块中的所有类
from app.db.account_entities import *
# 导入app.db.chat_entities模块中的所有类
from app.db.chat_entities import *
# 导入app.models.account_models模块中的所有类
from app.models.account_models import *
# 从app.core.logging模块中导入logging，用于记录日志
from app.core.logging import logging
# 导入app.ai模块中的chat_ai，用于处理AI聊天相关的功能
from app.ai import chat_ai
# 从app.ai.models模块中导入所有的类
from app.ai.models import *
# 从app.core.logging模块中再次导入logging，用于记录日志
from app.core.logging import logging
# 从app.core.language模块中导入所有的类和函数
from app.core.language import *
# 从app.core.language模块中再次导入所有的类和函数
from app.core.language import *

# 定义一个常量MESSAGE_SYSTEM，值为"SYSTEM"
MESSAGE_SYSTEM = "SYSTEM"

# 定义AccountService类，这个类用于处理账户相关的业务逻辑
class AccountService:
    # 定义初始化方法，接收一个Session实例作为参数
    def __init__(self, db: Session):
        # 将参数赋值给实例的属性
        self.db = db

    # 定义visitor_login方法，这个方法接收三个参数，分别是fingerprint、client_host和user_agent
    # 这个方法用于处理访客登录的业务逻辑
    def visitor_login(self, fingerprint: str, client_host: str, user_agent: str = None):
        # 先检查此ip下是否有用户，如果有，直接返回ip下的用户，如果没有，就生成新的访客
        visitor = (
            self.db.query(AccountEntity).filter_by(fingerprint=fingerprint).first()
        )
        if not visitor:
            visitor = AccountEntity(
                id=f"visitor_{short_uuid()}",
                fingerprint=fingerprint,
                client_host=client_host,
                user_agent=user_agent,
            )
            self.db.add(visitor)
            self.db.commit()

        self.__check_and_init_default_settings(visitor.id)
        return auth.init_token(visitor.id, visitor.id)

    # 定义collect方法，这个方法接收两个参数，分别是dto和account_id
    # 这个方法用于处理用户收藏的业务逻辑
    def collect(self, dto: CollectDTO, account_id: str):
        # 先检查是否已经存在，如果已经存在，就不需要再进行保存
        if dto.message_id:
            collect = (
                self.db.query(AccountCollectEntity)
                .filter_by(account_id=account_id, message_id=dto.message_id)
                .first()
            )
        else:
            collect = (
                self.db.query(AccountCollectEntity)
                .filter_by(account_id=account_id, type=dto.type, content=dto.content)
                .first()
            )

        if collect:
            if collect.deleted == 1:
                collect.deleted = 0
                collect.update_time = datetime.datetime.now()

            self.db.commit()
            return

        # 查询出session
        if dto.message_id:
            message = (
                self.db.query(MessageEntity)
                .filter_by(id=dto.message_id, account_id=account_id)
                .first()
            )
            content = message.content
        else:
            content = dto.content

        # 获得翻译
        source_language = self.get_account_source_language(account_id)
        translation = chat_ai.invoke_translate(
            TranslateParams(target_language=source_language, content=content)
        )

        # 如果没有任何符号且只有单独一个单词，则type为WORD，否则为 SENTENCE
        if re.match(r"^[a-zA-Z]+$", content) and len(content.split(" ")) == 1:
            type = "WORD"
        else:
            type = "SENTENCE"

        account_collect = AccountCollectEntity(
            account_id=account_id,
            type=type,
            message_id=dto.message_id,
            content=content,
            translation=translation,
        )
        self.db.add(account_collect)

        self.db.commit()
        return

    # 定义get_account_info方法，这个方法接收一个参数account_id
    # 这个方法用于获取用户的今日聊天次数与总次数返回
    def get_account_info(self, account_id: str):
        # 如果是访客，就返回访客的信息
        if account_id.startswith("visitor_"):
            account = self.db.query(AccountEntity).filter_by(id=account_id).first()
        else:
            # 不再支持account
            raise Exception("不再支持account")
        if not account:
            raise Exception("User not found")
        result = {
            "account_id": account_id,
            "today_chat_count": self.get_user_current_day_system_message_count(
                account_id
            ),
            "total_chat_count": self.get_user_system_message_count(account_id),
        }
        account_settings = (
            self.db.query(AccountSettingsEntity)
            .filter_by(account_id=account_id)
            .first()
        )
        target_language = account_settings.target_language
        result["target_language"] = target_language
        result["target_language_label"] = get_label_by_language(target_language)
        return result

    # 定义get_collect方法，这个方法接收两个参数，分别是dto和account_id
    # 这个方法用于获取用户是否已经收藏的数据
    def get_collect(self, dto: CollectDTO, account_id: str):
        if dto.message_id:
            collect = (
                self.db.query(AccountCollectEntity)
                .filter_by(account_id=account_id, message_id=dto.message_id)
                .first()
            )
        else:
            collect = (
                self.db.query(AccountCollectEntity)
                .filter_by(account_id=account_id, type=dto.type, content=dto.content)
                .first()
            )
        if collect and collect.deleted == 0:
            return {"is_collect": True}
        else:
            return {"is_collect": False}

    # 定义cancel_collect方法，这个方法接收两个参数，分别是dto和account_id
    # dto是CollectDTO类型，包含了用户想要取消收藏的信息，如message_id、type和content
    # account_id是用户的账户ID
    # 这个方法用于取消用户的收藏
    def cancel_collect(self, dto: CollectDTO, account_id: str):
        """取消收藏"""
        # 如果dto中的message_id存在
        if dto.message_id:
            # 从数据库中查询出AccountCollectEntity实例
            # 查询条件是account_id和message_id都与参数相同
            # first()方法返回查询结果的第一个实例
            collect = (
                self.db.query(AccountCollectEntity)
                .filter_by(account_id=account_id, message_id=dto.message_id)
                .first()
            )
        else:
            # 如果dto中的message_id不存在
            # 从数据库中查询出AccountCollectEntity实例
            # 查询条件是account_id、type和content都与参数相同
            # first()方法返回查询结果的第一个实例
            collect = (
                self.db.query(AccountCollectEntity)
                .filter_by(account_id=account_id, type=dto.type, content=dto.content)
                .first()
            )
        # 如果查询结果存在
        if collect:
            # 将collect的deleted属性设置为1，表示已删除
            collect.deleted = 1
            # 更新collect的update_time属性为当前时间
            collect.update_time = datetime.datetime.now()
            # 提交数据库会话，将更改保存到数据库
            self.db.commit()
        # 方法结束，返回None
        return

    # 定义get_collects方法，这个方法接收四个参数，分别是type、page、page_size和account_id
    # type是收藏的类型，page是当前页数，page_size是每页的数量，account_id是用户的账户ID
    # 这个方法用于获取用户收藏的列表信息
    def get_collects(self, type: str, page: int, page_size: int, account_id: str):
        """获取用户收藏的列表信息"""
        # 从数据库中查询出AccountCollectEntity实例
        # 查询条件是account_id和type都与参数相同，且deleted为0
        # order_by方法用于对查询结果进行排序，这里按照create_time降序排序
        query = (
            self.db.query(AccountCollectEntity)
            .filter_by(account_id=account_id, type=type, deleted=0)
            .order_by(AccountCollectEntity.create_time.desc())
        )
        # 使用offset和limit方法对查询结果进行分页
        # offset方法用于跳过前面的结果，limit方法用于限制返回的结果数量
        collects = query.offset((page - 1) * page_size).limit(page_size).all()
        # 使用count方法获取查询结果的总数
        total = query.count()
        # 创建一个空列表result，用于存放处理后的查询结果
        result = []
        # 遍历查询结果
        for collect in collects:
            # 将每个collect实例的相关属性添加到result中
            result.append(
                {
                    "id": collect.id,
                    "type": collect.type,
                    "content": collect.content,
                    "translation": collect.translation,
                    "message_id": collect.message_id,
                    "create_time": date_to_str(collect.create_time),
                }
            )
        # 返回一个字典，包含总数total和列表result
        return {"total": total, "list": result}


    def get_settings(self, account_id: str):
        """获取AccountSettingsEntity中key 为 auto_playing_voice, playing_voice_speed, auto_text_shadow, auto_pronunciation的配置"""
        settings = (
            self.db.query(AccountSettingsEntity)
            .filter(AccountSettingsEntity.account_id == account_id)
            .first()
        )
        # 设置 vo dict，里面的值与settings中的值一致
        vo = {
            "auto_playing_voice": settings.auto_playing_voice,
            "playing_voice_speed": settings.playing_voice_speed,
            "auto_text_shadow": settings.auto_text_shadow,
            "auto_pronunciation": settings.auto_pronunciation,
            "speech_role_name": settings.speech_role_name,
            "target_language": settings.target_language,
        }

        # 如果存在 speech_role_name，则从azure_voice_configs_group获取对应值，取local_name
        if settings.speech_role_name:
            voice_role_config = get_azure_voice_role_by_short_name(
                settings.speech_role_name
            )
            vo["speech_role_name_label"] = voice_role_config["local_name"]
        return vo

    # 定义save_settings方法，这个方法接收两个参数，分别是dto和account_id
    # dto是AccountSettingsDTO类型，包含了用户想要保存的设置，如auto_playing_voice、playing_voice_speed、auto_text_shadow、auto_pronunciation、speech_role_name和target_language
    # account_id是用户的账户ID
    # 这个方法用于保存用户的设置
    def save_settings(self, dto: AccountSettingsDTO, account_id: str):
        # 从数据库中查询出AccountSettingsEntity实例
        # 查询条件是account_id与参数相同
        # first()方法返回查询结果的第一个实例
        account_settings = (
            self.db.query(AccountSettingsEntity)
            .filter_by(account_id=account_id)
            .first()
        )
        # 如果dto中的auto_playing_voice存在，就将其值赋给account_settings的auto_playing_voice属性
        if dto.auto_playing_voice is not None:
            account_settings.auto_playing_voice = dto.auto_playing_voice
        # 如果dto中的playing_voice_speed存在，就将其值赋给account_settings的playing_voice_speed属性
        if dto.playing_voice_speed is not None:
            account_settings.playing_voice_speed = dto.playing_voice_speed
        # 如果dto中的auto_text_shadow存在，就将其值赋给account_settings的auto_text_shadow属性
        if dto.auto_text_shadow is not None:
            account_settings.auto_text_shadow = dto.auto_text_shadow
        # 如果dto中的auto_pronunciation存在，就将其值赋给account_settings的auto_pronunciation属性
        if dto.auto_pronunciation is not None:
            account_settings.auto_pronunciation = dto.auto_pronunciation
        # 如果dto中的speech_role_name存在，就将其值赋给account_settings的speech_role_name属性
        if dto.speech_role_name is not None:
            account_settings.speech_role_name = dto.speech_role_name
        # 如果dto中的target_language存在
        if dto.target_language is not None:
            # 如果dto中的target_language与account_settings的target_language不同
            if dto.target_language != account_settings.target_language:
                # 调用get_azure_language_default_role函数，获取dto中的target_language对应的语音角色，将其值赋给speech_role_name
                speech_role_name = get_azure_language_default_role(
                    dto.target_language
                )
                # 将speech_role_name的值赋给account_settings的speech_role_name属性
                account_settings.speech_role_name = speech_role_name
            # 将dto中的target_language的值赋给account_settings的target_language属性
            account_settings.target_language = dto.target_language
        # 提交数据库会话，将更改保存到数据库
        self.db.commit()


    # 定义update_role_setting方法，这个方法接收两个参数，分别是dto和account_id
    # dto是UpdateRoleDTO类型，包含了用户想要更新的角色信息，如role_name和style
    # account_id是用户的账户ID
    # 这个方法用于更新用户的角色设置
    def update_role_setting(self, dto: UpdateRoleDTO, account_id: str):
        # 从数据库中查询出AccountSettingsEntity实例
        # 查询条件是account_id与参数相同
        # first()方法返回查询结果的第一个实例
        account_settings_entity = (
            self.db.query(AccountSettingsEntity)
            .filter_by(account_id=account_id)
            .first()
        )
        # 将dto转换为json格式，然后赋值给account_settings_entity的role_setting属性
        # dto.model_dump()方法将dto转换为字典格式，json.dumps方法将字典转换为json格式
        account_settings_entity.role_setting = json.dumps(dto.model_dump())
        # 提交数据库会话，将更改保存到数据库
        self.db.commit()
        # 返回一个字典，包含account_id、role_name和role_style
        return {
            "account_id": account_id,
            "role_name": dto.role_name,
            "role_style": dto.style,
        }

    # 定义get_role_setting方法，这个方法接收一个参数account_id
    # account_id是用户的账户ID
    # 这个方法用于获取用户当前设置的角色
    def get_role_setting(self, account_id: str):
        # 从数据库中查询出AccountSettingsEntity实例
        # 查询条件是account_id与参数相同
        # first()方法返回查询结果的第一个实例
        account_settings_entity = (
            self.db.query(AccountSettingsEntity)
            .filter_by(account_id=account_id)
            .first()
        )
        # 调用get_azure_voice_role_by_short_name函数，将account_settings_entity的speech_role_name属性作为参数
        # 这个函数的功能是根据短名称获取Azure语音角色
        # 将返回的结果赋值给role_setting
        role_setting = get_azure_voice_role_by_short_name(account_settings_entity.speech_role_name)
        # 如果role_setting的gender属性为1
        if role_setting['gender'] == 1:
            # 将role_setting的role_image属性设置为JennyNeural的图片URL
            role_setting[
                'role_image'] = 'http://qiniu.prejade.com/1597936949107363840/talkie/images/en-US_JennyNeural.png'
        else:
            # 否则，将role_setting的role_image属性设置为Guy的图片URL
            role_setting['role_image'] = 'http://qiniu.prejade.com/1597936949107363840/talkie/images/en-US_Guy.png'
            # 返回一个字典，包含role_setting
        return {
            "role_setting": role_setting
        }



    def get_account_source_language(self, account_id: str):
        """获取用户的学习语言"""
        settings = (
            self.db.query(AccountSettingsEntity)
            .filter_by(account_id=account_id)
            .first()
        )
        if settings:
            return settings.source_language
        else:
            return Config.DEFAULT_SOURCE_LANGUAGE



    def get_account_target_language(self, account_id: str):
        """获取用户的目标语言"""
        settings = (
            self.db.query(AccountSettingsEntity)
            .filter_by(account_id=account_id)
            .first()
        )
        if settings:
            return settings.target_language
        else:
            return Config.DEFAULT_TARGET_LANGUAGE



    def get_user_current_day_system_message_count(self, account_id: str):
        """获取用户当天系统消息次数"""
        # 获取当天0点的时间进行筛选
        today = day_to_str(datetime.datetime.now())
        return (
            self.db.query(MessageEntity)
            .filter_by(account_id=account_id, type=MessageType.SYSTEM.value)
            .filter(MessageEntity.create_time >= today)
            .count()
        )



    def get_user_system_message_count(self, account_id: str):
        """获取用户当天系统消息次数"""
        return (
            self.db.query(MessageEntity)
            .filter_by(account_id=account_id, type=MessageType.SYSTEM.value)
            .count()
        )



    def __check_and_init_default_settings(self, account_id: str):
        """检查并初始化用户的默认设置"""
        # 先检查是否已经存在，如果已经存在，就不需要再进行保存
        settings = (
            self.db.query(AccountSettingsEntity)
            .filter_by(account_id=account_id)
            .first()
        )
        if not settings:
            speech_role_name = get_azure_language_default_role(
                Config.DEFAULT_TARGET_LANGUAGE
            )
            settings = AccountSettingsEntity(
                account_id=account_id,
                target_language=Config.DEFAULT_TARGET_LANGUAGE,
                source_language=Config.DEFAULT_SOURCE_LANGUAGE,
                speech_role_name=speech_role_name,
            )
            self.db.add(settings)
            self.db.commit()
