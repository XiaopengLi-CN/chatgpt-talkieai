# 导入app.services.sys_service模块中的SysService类
from app.services.sys_service import SysService
# 导入app.services.account_service模块中的AccountService类
from app.services.account_service import AccountService
# 导入app.services.chat_service模块中的ChatService类
from app.services.chat_service import ChatService
# 导入app.services.topic_service模块中的TopicService类
from app.services.topic_service import TopicService
# 导入app.db模块中的SessionLocal类，这个类用于创建数据库会话
from app.db import SessionLocal

# 创建一个数据库会话实例
db = SessionLocal()
# 创建一个SysService实例，传入数据库会话实例作为参数
# SysService类用于处理系统相关的业务逻辑
sys_service = SysService(db)
# 创建一个AccountService实例，传入数据库会话实例作为参数
# AccountService类用于处理账户相关的业务逻辑
account_service = AccountService(db)
# 创建一个TopicService实例，传入数据库会话实例作为参数
# TopicService类用于处理主题相关的业务逻辑
topic_service = TopicService(db)
# 创建一个ChatService实例，传入数据库会话实例作为参数
# ChatService类用于处理聊天相关的业务逻辑
chat_service = ChatService(db)
# 关闭数据库会话
db.close()