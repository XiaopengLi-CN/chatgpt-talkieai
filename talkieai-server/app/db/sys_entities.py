# 导入datetime模块，这个模块提供了日期和时间处理的类，这里主要用于生成默认的创建时间和更新时间
import datetime

# 导入sqlalchemy模块中的Column、String、DateTime、Integer、Index、Text类，这些类用于定义数据库表的列和索引
from sqlalchemy import Column, String, DateTime, Integer, Index, Text

# 导入app.db模块中的Base和engine，Base是所有模型类的基类，engine是数据库引擎，用于与数据库进行交互
from app.db import Base, engine

# 定义SettingsLanguageEntity类，这个类继承自Base，表示会话语言配置表
class SettingsLanguageEntity(Base):
    """会话语言配置表"""

    # 定义表名为"settings_language"
    __tablename__ = "settings_language"

    # 定义id列，类型为String，长度为80，作为主键
    id = Column("id", String(80), primary_key=True)

    # 定义language列，类型为String，长度为80，不能为空
    language = Column("language", String(80), nullable=False)

    # 定义full_language列，类型为String，长度为80，不能为空
    full_language = Column("full_language", String(80), nullable=False)

    # 定义label列，类型为String，长度为80，不能为空
    label = Column("label", String(80), nullable=False)

    # 定义full_label列，类型为String，长度为80，不能为空
    full_label = Column("full_label", String(80), nullable=False)

    # 定义description列，类型为String，长度为250，可以为空
    description = Column("description", String(250), nullable=True)

    # 定义sequence列，类型为Integer，默认值为"1"
    sequence = Column("sequence", Integer, default="1")

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 定义SettingsLanguageExampleEntity类，这个类继承自Base，表示会话示例配置表
class SettingsLanguageExampleEntity(Base):
    """会话示例配置表"""

    # 定义表名为"settings_language_example"
    __tablename__ = "settings_language_example"

    # 定义id列，类型为String，长度为80，作为主键
    id = Column("id", String(80), primary_key=True)

    # 定义language列，类型为String，长度为80，不能为空
    language = Column("language", String(80), nullable=False)

    # 定义example列，类型为String，长度为250，可以为空
    example = Column("example", String(250), nullable=True)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 定义SettingsRoleEntity类，这个类继承自Base，表示会话角色配置表
class SettingsRoleEntity(Base):
    """会话角色配置表"""

    # 定义表名为"settings_role"
    __tablename__ = "settings_role"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, primary_key=True, autoincrement=True)

    # 定义locale列，类型为String，长度为80，不能为空
    locale = Column("locale", String(80), nullable=False)

    # 定义local_name列，类型为String，长度为80，不能为空
    local_name = Column("local_name", String(80), nullable=False)

    # 定义name列，类型为String，长度为255，不能为空
    name = Column("name", String(255), nullable=False)

    # 定义short_name列，类型为String，长度为80，不能为空
    short_name = Column("short_name", String(80), nullable=False)

    # 定义gender列，类型为Integer，不能为空，默认值为1
    gender = Column("gender", Integer, nullable=False, default=1)

    # 定义avatar列，类型为String，长度为350，可以为空，这个列用于保存头像地址
    avatar = Column("avatar", String(350), nullable=True)

    # 定义audio列，类型为String，长度为350，可以为空，这个列用于保存试听音频地址
    audio = Column("audio", String(350), nullable=True)

    # 定义styles列，类型为String，长度为350，可以为空
    styles = Column("styles", String(350), nullable=True)

    # 定义status列，类型为String，长度为80，不能为空，默认值为"ACTIVE"
    status = Column("status", String(80), nullable=False, default="ACTIVE")

    # 定义sequence列，类型为Integer，不能为空，默认值为0，这个列用于排序
    sequence = Column("sequence", Integer, nullable=False, default=0)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column(
        "create_time", DateTime, nullable=False, default=datetime.datetime.now
    )

    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column(
        "update_time", DateTime, nullable=False, default=datetime.datetime.now
    )

    # 定义deleted列，类型为Integer，默认值为"0"
    deleted = Column("deleted", Integer, nullable=False, default=0)

# 定义FileDetail类，这个类继承自Base，表示文件表
class FileDetail(Base):
    """文件表"""

    # 定义表名为"file_detail"
    __tablename__ = "file_detail"

    # 定义id列，类型为String，长度为80，作为主键
    id = Column("id", String(80), primary_key=True)

    # 定义file_path列，类型为String，长度为150，不能为空
    file_path = Column("file_path", String(150), nullable=False)

    # 定义module列，类型为String，长度为80，可以为空
    module = Column("module", String(80), nullable=True)

    # 定义module_id列，类型为String，长度为80，可以为空
    module_id = Column("module_id", String(80), nullable=True)

    # 定义file_name列，类型为String，长度为150，可以为空
    file_name = Column("file_name", String(150), nullable=True)

    # 定义file_ext列，类型为String，长度为20，可以为空
    file_ext = Column("file_ext", String(20), nullable=True)

    # 定义deleted列，类型为Integer，默认值为"0"
    deleted = Column("deleted", Integer, default="0")

    # 定义created_by列，类型为String，长度为80，不能为空
    created_by = Column("created_by", String(80), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

# 定义SysCacheEntity类，这个类继承自Base，表示系统缓存表
class SysCacheEntity(Base):
    """系统缓存表"""

    # 定义表名为"sys_cache"
    __tablename__ = "sys_cache"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, primary_key=True, autoincrement=True)

    # 定义key列，类型为String，长度为80，不能为空
    key = Column("key", String(80), nullable=False)

    # 定义value列，类型为String，长度为512，不能为空
    value = Column("value", String(512), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 定义FeedbackEntity类，这个类继承自Base，表示用户反馈表
class FeedbackEntity(Base):
    """用户反馈表"""

    # 定义表名为"sys_feedback"
    __tablename__ = "sys_feedback"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, autoincrement=True, primary_key=True)

    # 定义account_id列，类型为String，长度为80，不能为空
    account_id = Column("account_id", String(80), nullable=False)

    # 定义content列，类型为String，长度为2500，不能为空
    content = Column("content", String(2500), nullable=False)

    # 定义contact列，类型为String，长度为250，不能为空
    contact = Column("contact", String(250), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

# 定义SysDictTypeEntity类，这个类继承自Base，表示系统字典类型表
class SysDictTypeEntity(Base):
    """系统字典类型表"""

    # 定义表名为"sys_dict_type"
    __tablename__ = "sys_dict_type"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, autoincrement=True, primary_key=True)

    # 定义dict_type列，类型为String，长度为80，不能为空
    dict_type = Column("dict_type", String(80), nullable=False)

    # 定义dict_name列，类型为String，长度为80，不能为空
    dict_name = Column("dict_name", String(80), nullable=False)

    # 定义status列，类型为String，长度为80，不能为空
    status = Column("status", String(80), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 定义SysDictDataEntity类，这个类继承自Base，表示系统字典数据表
class SysDictDataEntity(Base):
    """系统字典数据表"""

    # 定义表名为"sys_dict_data"
    __tablename__ = "sys_dict_data"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, autoincrement=True, primary_key=True)

    # 定义dict_type列，类型为String，长度为80，不能为空
    dict_type = Column("dict_type", String(80), nullable=False)

    # 定义dict_label列，类型为String，长度为80，不能为空
    dict_label = Column("dict_label", String(80), nullable=False)

    # 定义dict_value列，类型为String，长度为80，不能为空
    dict_value = Column("dict_value", String(80), nullable=False)

    # 定义status列，类型为String，长度为80，不能为空，默认值为"1"
    status = Column("status", String(80), nullable=False, default="1")

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 调用Base.metadata.create_all函数，如果数据库中不存在这些表，则创建这些表
# 这个函数会检查所有继承自Base的类，如果对应的表在数据库中不存在，则创建表
Base.metadata.create_all(engine)