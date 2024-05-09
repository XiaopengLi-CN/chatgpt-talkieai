# 导入Python的内置模块enum，用于创建枚举类
from enum import Enum
# 导入typing模块中的List和Dict，这两个类用于类型注解，表示列表和字典
from typing import List, Dict
# 导入pydantic模块中的BaseModel和constr，BaseModel用于创建数据模型，constr用于限制字符串的长度
from pydantic import BaseModel, constr

# 定义MessageType枚举类，表示消息类型
class MessageType(Enum):
    """消息类型"""

    # 定义ACCOUNT和SYSTEM两个枚举值，表示账户和系统两种消息类型
    ACCOUNT = "ACCOUNT"
    SYSTEM = "SYSTEM"
    # 定义PROMPT枚举值，表示智谱AI的第一句提示词
    PROMPT = "PROMPT"

# 定义CreateTalkSessionDTO类，这个类继承自BaseModel，用于创建对话会话的数据验证和序列化
class CreateTalkSessionDTO(BaseModel):
    # 定义language、short_name和style三个字段，类型都是str，style可以为空
    language: str
    short_name: str
    style: str = ""

# 定义CreateSessionDTO类，这个类继承自BaseModel，用于创建会话的数据验证和序列化
class CreateSessionDTO(BaseModel):
    # 定义topic_id字段，类型是str
    topic_id: str

# 定义ChatDTO类，这个类继承自BaseModel，用于聊天数据的验证和序列化
class ChatDTO(BaseModel):
    """聊天"""

    # 定义message和file_name两个字段，类型都是str，可以为空
    message: str = None
    file_name: str = None

# 定义MessagePracticeDTO类，这个类继承自BaseModel，用于句子练习数据的验证和序列化
class MessagePracticeDTO(BaseModel):
    """句子练习"""

    # 定义file_name字段，类型是str，不能为空
    file_name: str = None

# 定义TransformSpeechDTO类，这个类继承自BaseModel，用于消息转语音数据的验证和序列化
class TransformSpeechDTO(BaseModel):
    """消息转语音"""

    # 定义message_id字段，类型是str，最小长度是5
    message_id: constr(min_length=5)

# 定义VoiceTranslateDTO类，这个类继承自BaseModel，用于语音转文字数据的验证和序列化
class VoiceTranslateDTO(BaseModel):
    """语音转文字"""

    # 定义file_name字段，类型是str，最小长度是1
    file_name: constr(min_length=1)

# 定义TranslateDTO类，这个类继承自BaseModel，用于翻译数据的验证和序列化
class TranslateDTO(BaseModel):
    """翻译"""

    # 定义message_id字段，类型是str，最小长度是1
    message_id: constr(min_length=1)

# 定义TranslateTextDTO类，这个类继承自BaseModel，用于文本翻译数据的验证和序列化
class TranslateTextDTO(BaseModel):
    """翻译"""

    # 定义text和session_id两个字段，类型都是str，text不能为空，session_id可以为空
    text: constr(min_length=1)
    session_id: str = None

# 定义TransformContentSpeechDTO类，这个类继承自BaseModel，用于内容转语音数据的验证和序列化
class TransformContentSpeechDTO(BaseModel):
    """内容转语音"""

    # 定义session_id、content、speech_role_name、speech_role_style、speech_style和speech_rate六个字段，类型都是str，session_id、speech_role_name和speech_role_style可以为空
    session_id: str | None = None
    content: constr(max_length=500)
    speech_role_name: str | None = None
    speech_role_style: str | None = None
    speech_style: str = ""
    speech_rate: str = "1.0"

# 定义GrammarDTO类，这个类继承自BaseModel，用于分析英文的语法错误数据的验证和序列化
class GrammarDTO(BaseModel):
    """分析英文的语法错误"""

    # 定义message_id字段，类型是str，最小长度是1
    message_id: constr(min_length=1)

# 定义PronunciationDTO类，这个类继承自BaseModel，用于语音评估数据的验证和序列化
class PronunciationDTO(BaseModel):
    """语音评估"""
    # 定义message_id字段，类型是str，最小长度是1
    message_id: constr(min_length=1)

# 定义WordDetailDTO类，这个类继承自BaseModel，用于单词详情数据的验证和序列化
class WordDetailDTO(BaseModel):
    """单词详情"""

    # 定义language、session_id和word三个字段，类型都是str，language和session_id可以为空
    language: str = "en-US"
    session_id: str = None
    word: constr(min_length=1)

# 定义WordPracticeDTO类，这个类继承自BaseModel，用于单词练习数据的验证和序列化
class WordPracticeDTO(BaseModel):
    """单词练习"""

    # 定义session_id、word和file_name三个字段，类型都是str，都不能为空
    session_id: str = None
    word: constr(min_length=1)
    file_name: constr(min_length=1)

# 定义PromptDTO类，这个类继承自BaseModel，用于帮助用户生成提示句数据的验证和序列化
class PromptDTO(BaseModel):
    """帮助用户生成提示句"""

    # 定义session_id字段，类型是str，最小长度是1
    session_id: constr(min_length=1)