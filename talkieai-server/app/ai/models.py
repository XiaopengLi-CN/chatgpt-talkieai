# 导入typing模块，这个模块提供了类型提示的功能，我们可以通过它定义函数的参数类型和返回类型
from typing import List, Dict
# 导入dataclasses模块，这个模块提供了数据类的功能，我们可以通过它快速定义类，并自动实现一些常用方法，如__init__、__repr__等
from dataclasses import dataclass, field


# 使用dataclass装饰器定义MessageItemParams类，这是一个数据类，包含了role和content两个属性
@dataclass
class MessageItemParams:
    # role属性是一个字符串，表示角色
    role: str
    # content属性是一个字符串，表示内容
    content: str


# 使用dataclass装饰器定义MessageParams类，这是一个数据类，包含了language、name、messages、styles、temperature和max_tokens六个属性
@dataclass
class MessageParams:
    # language属性是一个字符串，表示语言
    language: str
    # name属性是一个字符串，表示名称
    name: str
    # messages属性是一个列表，每个元素是一个字典
    messages: List[Dict]
    # styles属性是一个列表，每个元素是一个字符串，表示样式
    styles: List[str]
    # temperature属性是一个浮点数，表示生成文本的随机性，值越大，生成的文本越随机
    temperature: float = 0.5
    # max_tokens属性是一个整数，表示生成文本的最大长度
    max_tokens: int = 300


# 使用dataclass装饰器定义AITopicMessageParams类，这是一个数据类，包含了language、speech_role_name、prompt、name、messages、styles、temperature和max_tokens八个属性
@dataclass
class AITopicMessageParams:
    # language属性是一个字符串，表示语言
    language: str
    # speech_role_name属性是一个字符串，表示语音角色名称
    speech_role_name: str
    # prompt属性是一个字符串，表示提示
    prompt: str
    # name属性是一个字符串，表示名称
    name: str
    # messages属性是一个列表，每个元素是一个字典
    messages: List[Dict] = field(default_factory=list)
    # styles属性是一个列表，每个元素是一个字符串，表示样式
    styles: List[str] = field(default_factory=list)
    # temperature属性是一个浮点数，表示生成文本的随机性，值越大，生成的文本越随机
    temperature: float = 0.5
    # max_tokens属性是一个整数，表示生成文本的最大长度
    max_tokens: int = 300


# 使用dataclass装饰器定义AITopicCompleteParams类，这是一个数据类，包含了language、targets和messages三个属性
@dataclass
class AITopicCompleteParams:
    # language属性是一个字符串，表示语言
    language: str
    # targets属性是一个列表，每个元素是一个字符串，表示目标
    targets: List[str] = field(default_factory=list)
    # messages属性是一个列表，每个元素是一个MessageItemParams类型的对象
    messages: List[MessageItemParams] = field(default_factory=list)


# 使用dataclass装饰器定义AITopicCompleteResult类，这是一个数据类，包含了targets、score、words和suggestion四个属性
@dataclass
class AITopicCompleteResult:
    # targets属性是一个字符串，表示目标
    targets: str
    # score属性是一个字符串，表示分数
    score: str
    # words属性是一个整数，表示单词数量
    words: int
    # suggestion属性是一个字符串，表示建议
    suggestion: str


# 使用dataclass装饰器定义AIMessageResult类，这是一个数据类，包含了message和message_style两个属性
@dataclass
class AIMessageResult:
    # message属性是一个字符串，表示消息
    message: str
    # message_style属性是一个字符串或None，表示消息样式
    message_style: str | None


# 使用dataclass装饰器定义AITopicMessageResult类，这是一个数据类，包含了message、message_style和completed三个属性
@dataclass
class AITopicMessageResult:
    # message属性是一个字符串，表示消息
    message: str
    # message_style属性是一个字符串或None，表示消息样式
    message_style: str | None
    # completed属性是一个布尔值，表示是否完成
    completed: bool


# 使用dataclass装饰器定义TranslateParams类，这是一个数据类，包含了target_language和content两个属性
@dataclass
class TranslateParams:
    # target_language属性是一个字符串，表示目标语言
    target_language: str
    # content属性是一个字符串，表示内容
    content: str


# 使用dataclass装饰器定义GreetParams类，这是一个数据类，包含了language一个属性
@dataclass
class GreetParams:
    # language属性是一个字符串，表示语言
    language: str


# 使用dataclass装饰器定义GrammarAnalysisParams类，这是一个数据类，包含了language和content两个属性
@dataclass
class GrammarAnalysisParams:
    # language属性是一个字符串，表示语言
    language: str
    # content属性是一个字符串，表示内容
    content: str


# 使用dataclass装饰器定义AIGrammarAnalysisResult类，这是一个数据类，包含了is_correct、error_reason、correct_content和better四个属性
@dataclass
class AIGrammarAnalysisResult:
    # is_correct属性是一个布尔值，表示是否正确
    is_correct: bool
    # error_reason属性是一个字符串，表示错误原因
    error_reason: str
    # correct_content属性是一个字符串，表示正确的内容
    correct_content: str
    # better属性是一个字符串，表示更好的
    better: str


# 使用dataclass装饰器定义PromptSentenceParams类，这是一个数据类，包含了language和messages两个属性
@dataclass
class PromptSentenceParams:
    # language属性是一个字符串，表示语言
    language: str
    # messages属性是一个列表，每个元素是一个字典
    messages: List[Dict]


# 使用dataclass装饰器定义WordDetailParams类，这是一个数据类，包含了word一个属性
@dataclass
class WordDetailParams:
    # word属性是一个字符串，表示单词
    word: str


# 使用dataclass装饰器定义AIWordDetailResult类，这是一个数据类，包含了phonetic和translation两个属性
@dataclass
class AIWordDetailResult:
    # phonetic属性是一个字符串，表示音标
    phonetic: str
    # translation属性是一个字符串，表示翻译
    translation: str


# 使用dataclass装饰器定义TopicGreetParams类，这是一个数据类，包含了language和prompt两个属性
@dataclass
class TopicGreetParams:
    # language属性是一个字符串，表示语言
    language: str
    # prompt属性是一个字符串，表示提示
    prompt: str
