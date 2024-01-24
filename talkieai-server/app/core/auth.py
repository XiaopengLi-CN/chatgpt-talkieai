# 导入time模块，这个模块提供了时间相关的功能，如获取当前时间戳
import time
# 导入jwt模块，这个模块提供了JWT（JSON Web Token）相关的功能，如生成和验证JWT
import jwt
# 从fastapi模块中导入HTTPException类，这个类用于处理HTTP异常
from fastapi import HTTPException

# 定义Auth类，这个类用于处理用户认证相关的操作
class Auth:
    # 定义初始化方法，接收五个参数：token_secret、algorithm、decoded_token_iat_key、expire_time和decoded_token_user_key
    def __init__(self, token_secret: str, algorithm: str, decoded_token_iat_key: str, expire_time: int,
                 decoded_token_user_key: str):
        # 将传入的token_secret赋值给实例变量self.token_secret，这个变量用于生成和验证JWT
        self.token_secret = token_secret
        # 将传入的algorithm赋值给实例变量self.algorithm，这个变量用于指定生成JWT的算法
        self.algorithm = algorithm
        # 将传入的expire_time赋值给实例变量self.expire_time，这个变量用于指定JWT的过期时间
        self.expire_time = expire_time
        # 将传入的decoded_token_iat_key赋值给实例变量self.decoded_token_iat_key，这个变量用于在解码JWT后，获取JWT的发行时间
        self.decoded_token_iat_key = decoded_token_iat_key
        # 将传入的decoded_token_user_key赋值给实例变量self.decoded_token_user_key，这个变量用于在解码JWT后，获取用户ID
        self.decoded_token_user_key = decoded_token_user_key

    # 定义init_token方法，这个方法用于生成JWT，接收两个参数：name和id
    def init_token(self, name: str, id: str) -> str:
        # 调用jwt模块的encode方法，将一个字典、self.token_secret和self.algorithm作为参数传入，返回生成的JWT
        # 这个字典包含了三个键值对，分别是'sub'、'iat'和'name'，'sub'的值是用户ID，'iat'的值是当前时间戳，'name'的值是用户名
        return jwt.encode({
            'sub': id,
            'iat': int(time.time()),
            'name': name
        }, self.token_secret, algorithm=self.algorithm)

    # 定义get_current_account方法，这个方法用于获取当前登录的用户账号的ID，接收一个参数：x_token
    def get_current_account(self, x_token: str) -> str:
        """Get user info from x_token"""
        # 如果x_token为空，则抛出HTTPException异常，状态码为401，详细信息为"X-Token header is missing"
        if not x_token:
            raise HTTPException(status_code=401, detail="X-Token header is missing")
        try:
            # 尝试调用jwt模块的decode方法，将x_token、self.token_secret和self.algorithm作为参数传入，返回解码后的JWT，赋值给decoded_token
            decoded_token = jwt.decode(x_token, self.token_secret, algorithms=[self.algorithm])
        except jwt.PyJWTError:
            # 如果在尝试解码JWT时发生异常，则打印异常信息，并抛出HTTPException异常，状态码为401，详细信息为"Invalid token"
            print(jwt.PyJWTError)
            raise HTTPException(status_code=401, detail="Invalid token")
        # 从decoded_token中获取发行时间，赋值给iat
        iat = decoded_token.get(self.decoded_token_iat_key)
        """Check whether the token is expired"""
        # 计算当前时间与发行时间的差值，单位为分钟，赋值给delta
        delta = int((time.time() - iat) / 60)
        # 如果delta大于self.expire_time，则抛出HTTPException异常，状态码为401，详细信息为"Token has expired"
        if delta > self.expire_time:
            raise HTTPException(status_code=401, detail="Token has expired")
        # 从decoded_token中获取用户ID，赋值给account_id
        account_id = decoded_token.get(self.decoded_token_user_key)
        # 如果account_id为空，则抛出HTTPException异常，状态码为401，详细信息为"User not found in token"
        if not account_id:
            raise HTTPException(status_code=401, detail="User not found in token")
        # 返回account_id
        return account_id