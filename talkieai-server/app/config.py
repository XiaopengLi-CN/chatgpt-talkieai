# 导入os模块，这个模块提供了丰富的方法用来处理文件和目录。常用的方法如：os.mkdir() 方法用于创建目录，os.environ 是一个包含所有环境变量的字典，可以被修改。
import os
# 导入dotenv模块的load_dotenv函数，这个函数用于加载.env文件中的环境变量。.env文件是一个简单的文本文件，用于存储环境变量。
from dotenv import load_dotenv

# 调用load_dotenv函数，加载.env文件中的环境变量。这样我们就可以在代码中使用这些环境变量了。
load_dotenv()


# 定义Config类，这个类用于管理应用的配置信息。类中的每个属性对应一个配置项。
class Config:
    # 默认的源语言和目标语言，这两个配置项用于配置翻译功能。
    DEFAULT_SOURCE_LANGUAGE = 'zh-CN'
    DEFAULT_TARGET_LANGUAGE = 'en-US'
    # AI的名称，这个配置项用于配置AI的名称。
    AI_NAME = os.getenv('AI_NAME')
    # 数据库连接信息，这个配置项用于配置数据库的连接信息。os.getenv函数用于获取环境变量的值。
    SQLALCHEMY_DATABASE_URL: str = os.getenv('DATABASE_URL')

    # 文件上传路径，这个配置项用于配置文件上传的临时保存路径。
    TEMP_SAVE_FILE_PATH = os.getenv('TEMP_SAVE_FILE_PATH')

    # 微软语音的密钥，这个配置项用于配置微软语音服务的密钥。
    AZURE_KEY = os.getenv('AZURE_KEY')

    # AI服务器的地址，这个配置项用于配置AI服务器的地址。
    AI_SERVER = os.getenv('AI_SERVER')
    # ChatGPT的代理和密钥，这两个配置项用于配置ChatGPT服务的代理和密钥。
    CHAT_GPT_PROXY = os.getenv('CHAT_GPT_PROXY')
    CHAT_GPT_KEY = os.getenv('CHAT_GPT_KEY')
    # ChatGPT的模型，这个配置项用于配置ChatGPT的模型。
    CHAT_GPT_MODEL = os.getenv('CHAT_GPT_MODEL')
    # 智谱AI的API密钥和模型，这两个配置项用于配置智谱AI的API密钥和模型。
    ZHIPU_AI_API_KEY = os.getenv('ZHIPU_AI_API_KEY')
    ZHIPU_AI_MODEL = os.getenv('ZHIPU_AI_MODEL')

    # 微信的APP ID和APP Secret，这两个配置项用于配置微信服务的APP ID和APP Secret。
    WECHAT_APP_ID = os.getenv('WECHAT_APP_ID')
    WECHAT_APP_SECRET = os.getenv('WECHAT_APP_SECRET')
    # 微信服务器的URL，这个配置项用于配置微信服务器的URL。
    WE_CHAT_SERVER_URL = os.getenv('WE_CHAT_SERVER_URL')

    # 是否开启SQL语句打印，这个配置项用于配置是否开启SQL语句的打印。os.getenv函数获取的环境变量的值是字符串类型，所以这里需要使用lower方法将其转换为小写，然后与'true'进行比较，得到一个布尔值。
    SQL_ECHO: bool = os.getenv('SQL_ECHO').lower() == 'true'

    # JWT的配置，这些配置项用于配置JWT的密钥、算法、解码后的用户键、解码后的时间戳键和过期时间。
    TOKEN_SECRET = os.getenv('TOKEN_SECRET')
    ALGORITHM = 'HS256'
    DECODED_TOKEN_USER_KEY = "sub"
    DECODED_TOKEN_IAT_KEY = "iat"
    TOKEN_EXPIRE_TIME = int(os.getenv("TOKEN_EXPIRE_TIME"))

    # API的前缀，这个配置项用于配置API的前缀。os.getenv函数的第二个参数是默认值，如果环境变量中没有API_PREFIX这个键，那么就会返回这个默认值。
    API_PREFIX = os.getenv('API_PREFIX', '/api')