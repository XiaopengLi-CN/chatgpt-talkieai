# 导入fastapi模块中的Header类，这个类用于处理HTTP请求头
from fastapi import Header

# 导入app.config模块，这个模块包含了项目的配置信息，如数据库连接、API密钥等
from app.config import Config
# 导入app.core.auth模块，这个模块包含了Auth类，这个类用于处理用户认证相关的操作
from app.core.auth import Auth

# 创建Auth类的实例，需要传入TOKEN_SECRET、ALGORITHM、DECODED_TOKEN_IAT_KEY、TOKEN_EXPIRE_TIME和DECODED_TOKEN_USER_KEY五个参数
# TOKEN_SECRET是用来生成和验证JWT（JSON Web Token）的密钥
# ALGORITHM是用来生成JWT的算法
# DECODED_TOKEN_IAT_KEY是在解码JWT后，用来获取JWT的发行时间的键
# TOKEN_EXPIRE_TIME是JWT的过期时间，单位是分钟
# DECODED_TOKEN_USER_KEY是在解码JWT后，用来获取用户ID的键
auth = Auth(Config.TOKEN_SECRET, Config.ALGORITHM, Config.DECODED_TOKEN_IAT_KEY, Config.TOKEN_EXPIRE_TIME,
            Config.DECODED_TOKEN_USER_KEY)


# 定义get_current_account函数，这个函数用于获取当前登录的用户账号的ID
def get_current_account(
    # 这个函数接收一个字符串作为参数，这个字符串是HTTP请求头中的X-Token字段，这个字段包含了JWT
    x_token: str = Header(None),
    # 这个函数接收一个字符串作为参数，这个字符串是HTTP请求参数中的x_token_query字段，这个字段包含了JWT
    x_token_query: str = None
):
    # 如果x_token_query不为空，则调用auth的get_current_account方法，将x_token_query传入，返回其结果
    # auth的get_current_account方法用于解码JWT，并返回其中的用户ID
    if x_token_query:
        return auth.get_current_account(x_token_query)
    # 如果x_token_query为空，则调用auth的get_current_account方法，将x_token传入，返回其结果
    return auth.get_current_account(x_token)