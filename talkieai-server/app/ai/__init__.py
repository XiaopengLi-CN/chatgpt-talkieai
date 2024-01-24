# 导入app.config模块，这个模块包含了项目的配置信息，如数据库连接、API密钥等
from app.config import Config
# 导入app.ai.impl.zhipu_ai模块，这个模块包含了ZhipuAIComponent类，这个类是用来与智谱AI进行交互的
from app.ai.impl.zhipu_ai import ZhipuAIComponent
# 导入app.ai.impl.chat_gpt_ai模块，这个模块包含了ChatGPTAI类，这个类是用来与ChatGPT AI进行交互的
from app.ai.impl.chat_gpt_ai import ChatGPTAI

# 判断Config.AI_SERVER的值，这个值决定了我们将使用哪个AI服务
if Config.AI_SERVER == 'CHAT_GPT':
    # 如果Config.AI_SERVER的值为'CHAT_GPT'，则我们将使用ChatGPT AI服务
    # 创建ChatGPTAI类的实例，需要传入api_key、base_url和model三个参数
    # api_key是用来访问ChatGPT AI服务的密钥
    # base_url是ChatGPT AI服务的基础URL
    # model是我们将要使用的ChatGPT AI模型的名称
    chat_ai = ChatGPTAI(api_key=Config.CHAT_GPT_KEY, base_url=Config.CHAT_GPT_PROXY, model=Config.CHAT_GPT_MODEL)
elif Config.AI_SERVER == 'ZHIPU':
    # 如果Config.AI_SERVER的值为'ZHIPU'，则我们将使用智谱AI服务
    # 创建ZhipuAIComponent类的实例，需要传入api_key和model两个参数
    # api_key是用来访问智谱AI服务的密钥
    # model是我们将要使用的智谱AI模型的名称
    chat_ai = ZhipuAIComponent(api_key=Config.ZHIPU_AI_API_KEY, model=Config.ZHIPU_AI_MODEL)
else:
    # 如果Config.AI_SERVER的值既不是'CHAT_GPT'也不是'ZHIPU'，则抛出异常
    # 这是因为我们的程序只支持这两种AI服务，如果Config.AI_SERVER的值既不是'CHAT_GPT'也不是'ZHIPU'，则说明配置错误
    raise Exception('AI_SERVER配置错误，只能配置为CHAT_GPT或ZHIPU')
