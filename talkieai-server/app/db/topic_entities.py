# 导入datetime模块，这个模块提供了日期和时间处理的类，这里主要用于生成默认的创建时间和更新时间
import datetime


# 导入Base，这是所有模型类的基类，它包含了一些基本的方法和属性，我们的模型类都需要继承它
# 导入Column，这是用来定义表的列的类，它可以接收一些参数来定义列的属性，比如类型、是否可以为空等
# 导入String，这是用来定义字符串类型的列的类
# 导入DateTime，这是用来定义日期时间类型的列的类
# 导入Integer，这是用来定义整数类型的列的类
# 导入Index，这是用来定义数据库表的索引的类，索引可以提高查询效率
from sqlalchemy import Column, String, DateTime, Integer, Index

# 导入Base和engine，Base是所有模型类的基类，engine是数据库引擎，用于与数据库进行交互
from app.db import Base, engine

# 定义TopicGroupEntity类，这个类继承自Base，表示聊天话题组表
class TopicGroupEntity(Base):
    """聊天话题组表"""

    # 定义表名为"topic_group"
    __tablename__ = "topic_group"

    # 定义id列，类型为String，长度为80，作为主键
    id = Column("id", String(80), primary_key=True)

    # 定义type列，类型为String，长度为80，不能为空，表示话题组的类型
    type = Column("type", String(80), nullable=False)

    # 定义name列，类型为String，长度为80，不能为空，表示话题组的名称
    name = Column("name", String(80), nullable=False)

    # 定义description列，类型为String，长度为80，不能为空，表示话题组的描述
    description = Column("description", String(80), nullable=False)

    # 定义status列，类型为String，长度为80，不能为空，默认值为"ACTIVE"，表示话题组的状态
    status = Column("status", String(80), nullable=False, default="ACTIVE")

    # 定义sequence列，类型为Integer，默认值为1，表示话题组的排序序号
    sequence = Column("sequence", Integer, nullable=False, default=1)

    # 定义created_by列，类型为String，长度为80，不能为空，表示创建话题组的用户
    created_by = Column("created_by", String(80), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间，表示话题组的创建时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间，表示话题组的更新时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

# 定义TopicEntity类，这个类继承自Base，表示聊天话题表
class TopicEntity(Base):
    """聊天话题表"""

    # 定义表名为"topic"
    __tablename__ = "topic"

    # 定义id列，类型为String，长度为80，作为主键
    id = Column("id", String(80), primary_key=True)

    # 定义group_id列，类型为String，长度为80，不能为空，表示话题所属的话题组
    group_id = Column("group_id", String(80), nullable=False)

    # 定义language列，类型为String，长度为80，不能为空，表示话题的语言
    language = Column("language", String(80), nullable=False)

    # 定义name列，类型为String，长度为80，不能为空，表示话题的名称
    name = Column("name", String(80), nullable=False)

    # 定义level列，类型为Integer，不能为空，表示话题的级别
    level = Column("level", Integer, nullable=False)

    # 定义role_short_name列，类型为String，长度为80，不能为空，表示话题所属的角色的短名
    role_short_name = Column("role_short_name", String(80), nullable=False)

    # 定义role_speech_rate列，类型为String，长度为80，不能为空，默认值为"1"，表示角色语音的默认速度
    role_speech_rate = Column("speech_rate", String(80), nullable=False, default="1")

    # 定义topic_bot_name列，类型为String，长度为580，不能为空，表示话题的机器人名
    topic_bot_name = Column("topic_bot_name", String(580), nullable=False)

    # 定义topic_user_name列，类型为String，长度为580，不能为空，表示话题的用户名
    topic_user_name = Column("topic_user_name", String(580), nullable=False)

    # 定义prompt列，类型为String，长度为2500，不能为空，表示话题的提示
    prompt = Column("prompt", String(2500), nullable=False)

    # 定义description列，类型为String，长度为580，不能为空，表示话题的描述
    description = Column("description", String(580), nullable=False)

    # 定义status列，类型为String，长度为80，不能为空，默认值为"ACTIVE"，表示话题的状态
    status = Column("status", String(80), nullable=False, default="ACTIVE")

    # 定义sequence列，类型为Integer，默认值为1，表示话题的排序序号
    sequence = Column("sequence", Integer, nullable=False, default=1)

    # 定义image_url列，类型为String，长度为500，可以为空，表示话题的图片URL
    image_url = Column("image_url", String(500), nullable=True)

    # 定义created_by列，类型为String，长度为80，不能为空，表示创建话题的用户
    created_by = Column("created_by", String(80), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间，表示话题的创建时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间，表示话题的更新时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

    # 为created_by列创建索引，提高查询效率
    created_by_index = Index("created_by_index", created_by)

    # 为group_id列创建索引，提高查询效率
    group_id_index = Index("group_id_index", group_id)

# 定义TopicSessionRelation类，这个类继承自Base，表示话题与session关系表
class TopicSessionRelation(Base):
    """话题与session关系表"""

    # 定义表名为"topic_session_relation"
    __tablename__ = "topic_session_relation"

    # 定义id列，类型为Integer，作为主键，自增
    id = Column("id", Integer, primary_key=True, autoincrement=True)

    # 定义topic_id列，类型为String，长度为80，不能为空，表示所属话题
    topic_id = Column("topic_id", String(80), nullable=False)

    # 定义session_id列，类型为String，长度为80，不能为空，表示所属session_id
    session_id = Column("session_id", String(80), nullable=False)

    # 定义account_id列，类型为String，长度为80，不能为空，表示用户账号
    account_id = Column("account_id", String(80), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间，表示创建时间
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间，表示更新时间
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

    # 为topic_id列创建索引，提高查询效率
    topic_id_index = Index("topic_id_index", topic_id)

    # 为session_id列创建索引，提高查询效率
    session_id_index = Index("session_id_index", session_id)


# 定义AccountTopicEntity类，这个类继承自Base，表示用户创建的话题表
class AccountTopicEntity(Base):
    """ 用户创建的话题表 """

    # 定义表名为"account_topic"，这是在数据库中创建的表的名称
    __tablename__ = "account_topic"

    # 定义id列，类型为String，长度为80，作为主键，主键是唯一标识一行数据的字段
    id = Column("id", String(80), primary_key=True)

    # 定义language列，类型为String，长度为80，不能为空，表示话题的语言，这是一个必填字段
    language = Column("language", String(80), nullable=False)

    # 定义ai_role列，类型为String，长度为280，不能为空，表示AI角色，这是一个必填字段
    ai_role = Column("ai_role", String(280), nullable=False)

    # 定义my_role列，类型为String，长度为280，不能为空，表示我的角色，这是一个必填字段
    my_role = Column("my_role", String(280), nullable=False)

    # 定义topic列，类型为String，长度为2500，不能为空，表示话题，这是一个必填字段
    topic = Column("topic", String(2500), nullable=False)

    # 定义account_id列，类型为String，长度为80，不能为空，表示账户ID，这是一个必填字段
    account_id = Column("account_id", String(80), nullable=False)

    # 定义created_by列，类型为String，长度为80，不能为空，表示创建者，这是一个必填字段
    created_by = Column("created_by", String(80), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间，表示创建时间，这是一个自动填充的字段
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义sequence列，类型为Integer，默认值为1，表示排序序号，这是一个自动填充的字段
    sequence = Column("sequence", Integer, nullable=False, default=1)

# 定义TopicTargetEntity类，这个类继承自Base，表示话题目标表
class TopicTargetEntity(Base):
    """话题目标表"""

    # 定义表名为"topic_target"，这是在数据库中创建的表的名称
    __tablename__ = "topic_target"

    # 定义id列，类型为Integer，作为主键，自增，主键是唯一标识一行数据的字段，自增意味着每插入一行数据，这个字段的值会自动加1
    id = Column("id", Integer, primary_key=True, autoincrement=True)

    # 定义topic_id列，类型为String，长度为80，不能为空，表示所属话题，这是一个必填字段
    topic_id = Column("topic_id", String(80), nullable=False)

    # 定义type列，类型为String，长度为80，不能为空，表示目标类型，这是一个必填字段
    type = Column("type", String(80), nullable=False)

    # 定义description列，类型为String，长度为500，不能为空，表示目标描述，这是一个必填字段
    description = Column("description", String(500), nullable=False)

    # 定义description_translation列，类型为String，长度为500，可以为空，表示目标描述的翻译，这是一个可选字段
    description_translation = Column("description_translation", String(500), nullable=True)

    # 定义status列，类型为String，长度为80，不能为空，默认值为"ACTIVE"，表示目标状态，这是一个自动填充的字段
    status = Column("status", String(80), nullable=False, default="ACTIVE")

    # 定义sequence列，类型为Integer，默认值为1，表示排序序号，这是一个自动填充的字段
    sequence = Column("sequence", Integer, nullable=False, default=1)

    # 定义created_by列，类型为String，长度为80，不能为空，表示创建者，这是一个必填字段
    created_by = Column("created_by", String(80), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间，表示创建时间，这是一个自动填充的字段
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

    # 定义update_time列，类型为DateTime，默认值为当前时间，表示更新时间，这是一个自动填充的字段
    update_time = Column("update_time", DateTime, default=datetime.datetime.now)

    # 为topic_id列创建索引，提高查询效率，索引是数据库中用于提高数据检索速度的数据结构
    topic_id_index = Index("topic_id_index", topic_id)

# 话题短语
class TopicPhraseEntity(Base):
    """话题短语"""

    # 定义表名为"topic_phrase"，这是在数据库中创建的表的名称
    __tablename__ = "topic_phrase"

    # 定义id列，类型为Integer，作为主键，自增，主键是唯一标识一行数据的字段，自增意味着每插入一行数据，这个字段的值会自动加1
    id = Column("id", Integer, primary_key=True, autoincrement=True)

    # 定义topic_id列，类型为String，长度为80，不能为空，表示所属话题，这是一个必填字段
    topic_id = Column("topic_id", String(80), nullable=False)

    # 定义phrase列，类型为String，长度为500，不能为空，表示短语，这是一个必填字段
    phrase = Column("phrase", String(500), nullable=False)

    # 定义phrase_translation列，类型为String，长度为500，可以为空，表示短语翻译，这是一个可选字段
    phrase_translation = Column("phrase_translation", String(500), nullable=True)

    # 定义type列，类型为String，长度为80，不能为空，表示短语类型，这是一个必填字段
    type = Column("type", String(80), nullable=False)

    # 定义status列，类型为String，长度为80，不能为空，默认值为"ACTIVE"，表示短语状态，这是一个自动填充的字段
    status = Column("status", String(80), nullable=False, default="ACTIVE")

    # 定义sequence列，类型为Integer，默认值为1，表示排序序号，这是一个自动填充的字段
    sequence = Column("sequence", Integer, nullable=False, default=1)

    # 定义created_by列，类型为String，长度为80，不能为空，表示创建者，这是一个必填字段
    created_by = Column("created_by", String(80), nullable=False)

    # 定义create_time列，类型为DateTime，默认值为当前时间，表示创建时间，这是一个自动填充的字段
    create_time = Column("create_time", DateTime, default=datetime.datetime.now)

# 数据库未创建表的话自动创建表
Base.metadata.create_all(engine)
