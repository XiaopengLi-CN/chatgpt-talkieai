# 导入app.ai.models模块，这个模块包含了我们项目中定义的所有AI模型
from app.ai.models import *
# 导入abc模块，这个模块提供了抽象基类的功能，我们可以通过它定义抽象方法和抽象类
from abc import ABC, abstractmethod
# 导入typing模块，这个模块提供了类型提示的功能，我们可以通过它定义函数的参数类型和返回类型
from typing import List, Dict
# 导入dataclasses模块，这个模块提供了数据类的功能，我们可以通过它快速定义类，并自动实现一些常用方法，如__init__、__repr__等
from dataclasses import dataclass


# 使用dataclass装饰器定义MessageInvokeDTO类，这是一个数据类，包含了messages、temperature和max_tokens三个属性
@dataclass
class MessageInvokeDTO:
    # messages属性是一个列表，每个元素是一个字典
    messages: List[Dict]
    # temperature属性是一个浮点数，表示生成文本的随机性，值越大，生成的文本越随机
    temperature: float = 0.5
    # max_tokens属性是一个整数，表示生成文本的最大长度
    max_tokens: int = 300


# 使用dataclass装饰器定义FunctionInvokeDTO类，这是一个数据类，包含了function、messages、temperature和max_tokens四个属性
@dataclass
class FunctionInvokeDTO:
    # function属性是一个字典，表示要调用的函数
    function: Dict
    # messages属性是一个列表，每个元素是一个字典
    messages: List[Dict]
    # temperature属性是一个浮点数，表示生成文本的随机性，值越大，生成的文本越随机
    temperature: float = 0.5
    # max_tokens属性是一个整数，表示生成文本的最大长度
    max_tokens: int = 300


# 使用ABC元类和abstractmethod装饰器定义ChatAI抽象类，这个类定义了一系列的抽象方法，具体的实现需要由子类提供
class ChatAI(ABC):
    # 定义invoke_message抽象方法，这个方法接受一个MessageParams类型的参数，返回一个AIMessageResult类型的结果
    @abstractmethod
    def invoke_message(self, dto: MessageParams) -> AIMessageResult:
        """聊天"""
        pass

    # 定义invoke_translate抽象方法，这个方法接受一个TranslateParams类型的参数，返回一个字符串
    @abstractmethod
    def invoke_translate(self, dto: TranslateParams) -> str:
        """翻译"""
        pass

    # 定义invoke_greet抽象方法，这个方法接受一个GreetParams类型的参数，返回一个字符串
    @abstractmethod
    def invoke_greet(self, dto: GreetParams) -> str:
        """打招呼"""
        pass

    # 定义invoke_grammar_analysis抽象方法，这个方法接受一个GrammarAnalysisParams类型的参数，返回一个AIGrammarAnalysisResult类型的结果
    @abstractmethod
    def invoke_grammar_analysis(
            self, dto: GrammarAnalysisParams
    ) -> AIGrammarAnalysisResult:
        """语法分析"""
        pass

    # 定义invoke_prompt_sentence抽象方法，这个方法接受一个PromptSentenceParams类型的参数，返回一个字符串
    @abstractmethod
    def invoke_prompt_sentence(self, dto: PromptSentenceParams) -> str:
        """为用户提示句子"""
        pass

    # 定义invoke_word_detail抽象方法，这个方法接受一个WordDetailParams类型的参数，返回一个AIWordDetailResult类型的结果
    @abstractmethod
    def invoke_word_detail(self, dto: WordDetailParams) -> AIWordDetailResult:
        """单词详情"""
        pass

    # 定义topic_invoke_greet抽象方法，这个方法接受一个TopicGreetParams类型的参数，返回一个字符串
    @abstractmethod
    def topic_invoke_greet(self, dto: TopicGreetParams) -> str:
        """场景 打招呼"""
        pass

    # 定义topic_invoke_message抽象方法，这个方法接受一个AITopicMessageParams类型的参数，返回一个AITopicMessageResult类型的结果
    @abstractmethod
    def topic_invoke_message(self, dto: AITopicMessageParams) -> AITopicMessageResult:
        """场景 聊天"""
        pass

    # 定义topic_invoke_complete抽象方法，这个方法接受一个AITopicCompleteParams类型的参数，返回一个AITopicCompleteResult类型的结果
    @abstractmethod
    def topic_invoke_complete(self, dto: AITopicCompleteParams) -> AITopicCompleteResult:
        """场景 结束"""
        pass
