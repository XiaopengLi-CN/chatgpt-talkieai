# 导入sqlalchemy模块中的create_engine函数，这个函数用于创建数据库引擎
# 导入sqlalchemy模块中的event，这个模块用于处理SQLAlchemy事件
# 导入sqlalchemy模块中的declarative_base函数，这个函数用于创建基类
# 导入sqlalchemy.orm模块中的sessionmaker函数，这个函数用于创建会话工厂
from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
# 导入app.config模块中的Config类，这个类包含了项目的配置信息
from app.config import Config
# 导入sqlalchemy.exc模块中的DisconnectionError，这个异常用于处理数据库连接断开的情况
from sqlalchemy.exc import DisconnectionError


# 定义checkout_listener函数，这个函数用于处理数据库连接检出的事件
def checkout_listener(dbapi_con, con_record, con_proxy):
    try:
        try:
            # 调用数据库连接的ping方法，检查连接是否正常
            dbapi_con.ping(False)
        except TypeError:
            # 如果ping方法不接受参数，则再次调用ping方法，不传入参数
            dbapi_con.ping()
    except dbapi_con.OperationalError as exc:
        # 如果ping方法抛出OperationalError异常，且异常的参数在(2006, 2013, 2014, 2045, 2055)中，则抛出DisconnectionError异常
        if exc.args[0] in (2006, 2013, 2014, 2045, 2055):
            raise DisconnectionError()
        else:
            # 如果异常的参数不在(2006, 2013, 2014, 2045, 2055)中，则直接抛出异常
            raise


# 检查Config.SQLALCHEMY_DATABASE_URL是否为空，如果为空，则抛出异常
if not Config.SQLALCHEMY_DATABASE_URL:
    raise Exception('SQLALCHEMY_DATABASE_URL不能为空')
# 调用create_engine函数，创建数据库引擎
engine = create_engine(Config.SQLALCHEMY_DATABASE_URL, echo=Config.SQL_ECHO, pool_pre_ping=True, pool_size=100, pool_recycle=360)
# 调用event.listen函数，监听数据库引擎的checkout事件，当checkout事件发生时，调用checkout_listener函数
event.listen(engine, 'checkout', checkout_listener)
# 调用sessionmaker函数，创建会话工厂，将数据库引擎作为参数传入
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 调用declarative_base函数，创建基类
Base = declarative_base()


# 定义get_db函数，这个函数用于获取数据库会话
def get_db():
    # 调用SessionLocal函数，创建数据库会话
    db = SessionLocal()
    try:
        # 使用yield语句，将数据库会话返回给调用者
        yield db
    finally:
        # 在函数结束时，关闭数据库会话
        db.close()