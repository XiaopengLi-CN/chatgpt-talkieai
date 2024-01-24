# 导入datetime模块，这个模块提供了日期和时间处理的类，这里主要用于生成默认的创建时间和更新时间
import datetime

# 导入sqlalchemy模块中的Column、String、DateTime、Integer、Index、Text类，这些类用于定义数据库表的列和索引
from sqlalchemy import Column, String, DateTime, Integer, Index, Text

# 导入app.db模块中的Base和engine，Base是所有模型类的基类，engine是数据库引擎，用于与数据库进行交互
from app.db import Base, engine

# 定义MessageSessionEntity类，这个类继承自Base，表示消息会话表
class MessageSessionEntity(Base):
    """消息会话表"""

    # 定义表名为"message_session"
    __tablename__ = "message_session"

    # 定义id列，类型为String，长度为80，作为主键
    id = Column("id", String(80), primary_key=True)

    # 定义account_id列，类型为String，长度为80，不能为空
    account_id = Column("account_id", String(80), nullable=False)

    # 定义type列，类型为String，长度为50，不能为空，默认值为"CHAT"
    type = Column("type", String(50), nullable=False, default="CHAT")

    # 定义message_count列，类型为Integer，默认值为"0"
    message_count = Column("message_count", Integer, default="0")

    # 定义is_default列，类型为Integer，默认值为"0"
    is_default = Column("is_default", Integer, default="0")

    # 定义completed列，类型为Integer，默认值为"0"
    completed = Column("completed", Integer, default="0")

    # 定义deleted列，类型为Integer，默认值为"0"
    deleted = Column("deleted", Integer, default="0")

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 定义MessageEntity类，这个类继承自Base，表示消息表
class MessageEntity(Base):
    """消息表"""

    # 定义表名为"message"
    __tablename__ = "message"

    # 定义id列，类型为String，长度为80，作为主键
    id = Column("id", String(80), primary_key=True)

    # 定义session_id列，类型为String，长度为80，不能为空
    session_id = Column("session_id", String(80), nullable=False)

    # 定义account_id列，类型为String，长度为80，不能为空
    account_id = Column("account_id", String(80), nullable=False)

    # 定义sender列，类型为String，长度为80，不能为空
    sender = Column("sender", String(80), nullable=False)

    # 定义receiver列，类型为String，长度为80，不能为空
    receiver = Column("receiver", String(80), nullable=False)

    # 定义type列，类型为String，长度为50，不能为空
    type = Column("type", String(50), nullable=False)

    # 定义content列，类型为String，长度为2500，不能为空
    content = Column("content", String(2500), nullable=False)

    # 定义style列，类型为String，长度为80，可以为空
    style = Column("style", String(80), nullable=True)

    # 定义length列，类型为Integer，不能为空
    length = Column("length", Integer, nullable=False)

    # 定义file_name列，类型为String，长度为80，可以为空
    file_name = Column("file_name", String(80), nullable=True)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义deleted列，类型为Integer，默认值为"0"
    deleted = Column("deleted", Integer, default="0")

    # 定义sequence列，类型为Integer，不能为空，这个列用于排序
    sequence = Column("sequence", Integer, nullable=False)

    # 为session_id列创建索引，提高查询效率
    Index("idx_session_id", "session_id")

    # 为account_id列创建索引，提高查询效率
    Index("idx_account_id", "account_id")

    # 为sequence列创建索引，提高查询效率
    Index("idx_sequence", "sequence")

# 定义MessageTranslateEntity类，这个类继承自Base，表示用户翻译记录表
class MessageTranslateEntity(Base):
    """用户翻译记录表, 使用自增id"""

    # 定义表名为"message_translate"
    __tablename__ = "message_translate"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, primary_key=True, autoincrement=True)

    # 定义session_id列，类型为String，长度为80，不能为空
    session_id = Column("session_id", String(80), nullable=False)

    # 定义message_id列，类型为String，长度为80，不能为空
    message_id = Column("message_id", String(80), nullable=False)

    # 定义account_id列，类型为String，长度为80，不能为空
    account_id = Column("account_id", String(80), nullable=False)

    # 定义source_language列，类型为String，长度为80，不能为空
    source_language = Column("source_language", String(80), nullable=False)

    # 定义target_language列，类型为String，长度为80，不能为空
    target_language = Column("target_language", String(80), nullable=False)

    # 定义source_text列，类型为String，长度为512，不能为空
    source_text = Column("source_text", String(512), nullable=False)

    # 定义target_text列，类型为String，长度为512，不能为空
    target_text = Column("target_text", String(512), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

# 定义MessageGrammarEntity类，这个类继承自Base，表示用户语法与语音分析表
class MessageGrammarEntity(Base):
    """用户语法与语音分析表，结果使用json保存"""

    # 定义表名为"message_grammar"
    __tablename__ = "message_grammar"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, primary_key=True, autoincrement=True)

    # 定义session_id列，类型为String，长度为80，不能为空
    session_id = Column("session_id", String(80), nullable=False)

    # 定义message_id列，类型为String，长度为80，不能为空
    message_id = Column("message_id", String(80), nullable=False)

    # 定义file_name列，类型为String，长度为80，可以为空
    file_name = Column("file_name", String(80), nullable=True)

    # 定义account_id列，类型为String，长度为80，不能为空
    account_id = Column("account_id", String(80), nullable=False)

    # 定义type列，类型为String，长度为80，不能为空
    type = Column("type", String(80), nullable=False)

    # 定义result列，类型为Text，不能为空，这个列用于保存分析结果，结果以json格式保存
    result = Column("result", Text, nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

# 调用Base.metadata.create_all函数，如果数据库中不存在这些表，则创建这些表
Base.metadata.create_all(engine)