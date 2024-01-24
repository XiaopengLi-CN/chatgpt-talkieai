# 导入datetime模块，这个模块提供了日期和时间处理的功能
import datetime

# 从sqlalchemy模块中导入Column、String、DateTime、Integer，这些类用于定义表的列和数据类型
# 从app.db模块中导入Base和engine，Base是所有模型类的基类，engine是数据库引擎
from sqlalchemy import Column, String, DateTime, Integer
from app.db import Base, engine

# 定义AccountEntity类，这个类继承自Base，表示访客表
class AccountEntity(Base):
    """访客表"""

    # 定义表名为"account"
    __tablename__ = "account"

    # 定义id列，类型为String，长度为80，作为主键
    id = Column("id", String(80), primary_key=True)
    # 定义client_host列，类型为String，长度为50，不能为空
    client_host = Column("client_host", String(50), nullable=False)
    # 定义user_agent列，类型为String，长度为512，可以为空
    user_agent = Column("user_agent", String(512), nullable=True)
    # 定义fingerprint列，类型为String，长度为64，可以为空
    fingerprint = Column("fingerprint", String(64), nullable=True)
    # 定义status列，类型为String，长度为50，默认值为"ACTIVE"
    status = Column("status", String(50), default="ACTIVE")
    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)
    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 定义AccountSettingsEntity类，这个类继承自Base，表示用户设置表
class AccountSettingsEntity(Base):
    """用户设置表"""

    # 定义表名为"account_settings"
    __tablename__ = "account_settings"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    # 定义account_id列，类型为String，长度为80，不能为空
    account_id = Column("account_id", String(80), nullable=False)
    # 定义source_language列，类型为String，长度为80，不能为空
    source_language = Column("source_language", String(80), nullable=False)
    # 定义target_language列，类型为String，长度为80，不能为空
    target_language = Column("target_language", String(80), nullable=False)
    # 定义speech_role_name列，类型为String，长度为80，可以为空
    speech_role_name = Column("speech_role_name", String(80), nullable=True)
    # 定义auto_playing_voice列，类型为Integer，默认值为1
    auto_playing_voice = Column("auto_playing_voice", Integer, default=1)
    # 定义playing_voice_speed列，类型为String，长度为50，默认值为'1.0'
    playing_voice_speed = Column("playing_voice_speed", String(50), default='1.0')
    # 定义auto_text_shadow列，类型为Integer，默认值为1
    auto_text_shadow = Column("auto_text_shadow", Integer, default=1)
    # 定义auto_pronunciation列，类型为Integer，默认值为1
    auto_pronunciation = Column("auto_pronunciation", Integer, default=1)
    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)
    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 定义AccountCollectEntity类，这个类继承自Base，表示用户收藏表
class AccountCollectEntity(Base):
    """用户收藏表"""

    # 定义表名为"account_collect"
    __tablename__ = "account_collect"
    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    # 定义message_id列，类型为String，长度为80，可以为空
    message_id = Column("message_id", String(80), nullable=True)
    # 定义account_id列，类型为String，长度为80，不能为空
    account_id = Column("account_id", String(80), nullable=False)
    # 定义type列，类型为String，长度为80，不能为空
    type = Column("type", String(80), nullable=False)
    # 定义content列，类型为String，长度为2500，可以为空
    content = Column("content", String(2500), nullable=True)
    # 定义translation列，类型为String，长度为2500，可以为空
    translation = Column("translation", String(2500), nullable=True)
    # 定义deleted列，类型为Integer，默认值为"0"
    deleted = Column("deleted", Integer, default="0")
    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)
    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 调用Base.metadata.create_all函数，如果数据库中不存在这些表，则创建这些表
Base.metadata.create_all(engine)