# 导入Python的内置模块enum，用于创建枚举类
from enum import Enum
# 导入typing模块中的List和Dict，这两个类用于类型注解，表示列表和字典
from typing import List, Dict
# 导入pydantic模块中的BaseModel和constr，BaseModel用于创建数据模型，constr用于限制字符串的长度
from pydantic import BaseModel, constr

# 定义UpdateLanguageDTO类，这个类继承自BaseModel，用于更新语言数据的验证和序列化
class UpdateLanguageDTO(BaseModel):
    # 定义language字段，类型是str，最小长度是1
    # 这个字段用于接收用户想要更新的语言
    language: constr(min_length=1)

# 定义FeedbackDTO类，这个类继承自BaseModel，用于用户反馈数据的验证和序列化
class FeedbackDTO(BaseModel):
    # 定义content字段，类型是str，最小长度是1
    # 这个字段用于接收用户的反馈内容
    content: constr(min_length=1)
    # 定义contact字段，类型是str，可以为空
    # 这个字段用于接收用户的联系方式，如果用户愿意提供的话
    contact: str = None