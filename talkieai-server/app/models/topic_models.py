# 导入Python的内置模块enum，用于创建枚举类
from enum import Enum
# 导入typing模块中的List和Dict，这两个类用于类型注解，表示列表和字典
from typing import List, Dict
# 导入pydantic模块中的BaseModel和constr，BaseModel用于创建数据模型，constr用于限制字符串的长度
from pydantic import BaseModel, constr

# 定义CreateSessionDTO类，这个类继承自BaseModel，用于创建会话的数据验证和序列化
class CreateSessionDTO(BaseModel):
    # 定义topic_id字段，类型是str
    # 这个字段用于接收用户想要创建的会话的主题ID
    topic_id: str

# 定义TopicCreateDTO类，这个类继承自BaseModel，用于创建主题的数据验证和序列化
class TopicCreateDTO(BaseModel):
    # 定义ai_role字段，类型是str
    # 这个字段用于接收用户设置的AI角色
    ai_role: str
    # 定义my_role字段，类型是str
    # 这个字段用于接收用户设置的自己的角色
    my_role: str
    # 定义topic字段，类型是str
    # 这个字段用于接收用户设置的主题
    topic: str