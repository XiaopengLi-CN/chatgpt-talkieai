# 导入Enum，这是Python的内置模块，用于创建枚举类
from enum import Enum

# 导入typing模块中的List和Dict，这两个类用于类型注解，表示列表和字典
# 导入BaseModel和constr，这两个类来自pydantic模块，用于数据验证和序列化
from typing import List, Dict
from pydantic import BaseModel, constr

# 定义MessageType枚举类，表示消息类型
class MessageType(Enum):
    """消息类型"""

    ACCOUNT = "ACCOUNT"
    SYSTEM = "SYSTEM"
# 定义WechatLoginDTO类，这个类继承自BaseModel，用于微信登录数据的验证和序列化
class WechatLoginDTO(BaseModel):
    # 定义code和state两个字段，类型都是str，可以为空
    code: str = None
    state: str = None

# 定义VisitorLoginDTO类，这个类继承自BaseModel，用于游客登录数据的验证和序列化
class VisitorLoginDTO(BaseModel):
    # 定义fingerprint字段，类型是str，最小长度是15
    fingerprint: constr(min_length=15)

# 定义ChatDTO类，这个类继承自BaseModel，用于聊天数据的验证和序列化
class ChatDTO(BaseModel):
    """聊天"""

    # 定义message和file_name两个字段，类型都是str，可以为空
    message: str | None = None
    file_name: str | None = None

# 定义MessagePracticeDTO类，这个类继承自BaseModel，用于句子练习数据的验证和序列化
class MessagePracticeDTO(BaseModel):
    """句子练习"""

    # 定义file_name字段，类型是str，不能为空
    file_name: str = None

# 定义TransformSpeechDTO类，这个类继承自BaseModel，用于消息转语音数据的验证和序列化
class TransformSpeechDTO(BaseModel):
    """消息转语音"""

    # 定义message_id字段，类型是str，最小长度是5
    message_id: constr(min_length=5)

# 定义VoiceTranslateDTO类，这个类继承自BaseModel，用于语音转文字数据的验证和序列化
class VoiceTranslateDTO(BaseModel):
    """语音转文字"""

    # 定义file_name字段，类型是str，最小长度是1
    file_name: constr(min_length=1)

# 定义TranslateDTO类，这个类继承自BaseModel，用于翻译数据的验证和序列化
class TranslateDTO(BaseModel):
    """翻译"""

    # 定义message_id字段，类型是str，最小长度是1
    message_id: constr(min_length=1)

# 定义TranslateTextDTO类，这个类继承自BaseModel，用于文本翻译数据的验证和序列化
class TranslateTextDTO(BaseModel):
    """翻译"""

    # 定义text和session_id两个字段，类型都是str，text不能为空，session_id可以为空
    text: constr(min_length=1)
    session_id: str = None

# 定义GrammarDTO类，这个类继承自BaseModel，用于分析英文的语法错误数据的验证和序列化
class GrammarDTO(BaseModel):
    """分析英文的语法错误"""

    # 定义message_id字段，类型是str，最小长度是1
    message_id: constr(min_length=1)

# 定义WordDetailDTO类，这个类继承自BaseModel，用于单词详情数据的验证和序列化
class WordDetailDTO(BaseModel):
    """单词详情"""

    # 定义word字段，类型是str，最小长度是1
    word: constr(min_length=1)

# 定义WordPracticeDTO类，这个类继承自BaseModel，用于单词练习数据的验证和序列化
class WordPracticeDTO(BaseModel):
    """单词练习"""

    # 定义session_id、word和file_name三个字段，类型都是str，都不能为空
    session_id: str = None
    word: constr(min_length=1)
    file_name: constr(min_length=1)

# 定义CollectDTO类，这个类继承自BaseModel，用于收藏单词或者句子数据的验证和序列化
class CollectDTO(BaseModel):
    """收藏单词或者句子"""

    # 定义type、message_id和content三个字段，类型都是str，type不能为空，message_id和content可以为空
    type: constr(min_length=1)
    message_id: str = None
    content: str = None

# 定义PromptDTO类，这个类继承自BaseModel，用于帮助用户生成提示句数据的验证和序列化
class PromptDTO(BaseModel):
    """帮助用户生成提示句"""

    # 定义session_id字段，类型是str，最小长度是1
    session_id: constr(min_length=1)

# 定义AccountSettingsDTO类，这个类继承自BaseModel，用于账户设置数据的验证和序列化
class AccountSettingsDTO(BaseModel):
    auto_playing_voice: bool = True
    playing_voice_speed: str = "1.0"
    auto_text_shadow: bool = True
    auto_pronunciation: bool = True

# 定义CreateSessionDTO类，这个类继承自BaseModel，用于创建会话数据的验证和序列化
class CreateSessionDTO(BaseModel):
    role_name: str

# 定义UpdateRoleDTO类，这个类继承自BaseModel，用于更新角色数据的验证和序列化
class UpdateRoleDTO(BaseModel):
    language: str
    role_name: str
    style: str = None
    avatar: str
    local_name: str

# 定义UpdateLanguageDTO类，这个类继承自BaseModel，用于更新语言数据的验证和序列化
class UpdateLanguageDTO(BaseModel):
    language: constr(min_length=1)

# 定义AccountSettingsDTO类，这个类继承自BaseModel，用于账户设置数据的验证和序列化
class AccountSettingsDTO(BaseModel):
    target_language: str | None = None
    speech_role_name: str | None = None
    auto_playing_voice: int = 1
    playing_voice_speed: str = "1.0"
    auto_text_shadow: int = 1
    auto_pronunciation: int = 1