# 导入typing模块，这个模块提供了类型提示的功能，我们可以通过它定义函数的参数类型和返回类型
from typing import List, Dict
# 导入json模块，这个模块提供了JSON编码和解码的功能，我们可以通过它将Python对象转换为JSON格式的字符串，或者将JSON格式的字符串转换为Python对象
import json
# 导入dataclasses模块，这个模块提供了数据类的功能，我们可以通过它快速定义类，并自动实现一些常用方法，如__init__、__repr__等
from dataclasses import dataclass
# 导入app.ai.interfaces模块，这个模块包含了我们项目中定义的所有AI接口
from app.ai.interfaces import *
# 导入app.ai.models模块，这个模块包含了我们项目中定义的所有AI模型
from app.ai.models import *
# 导入app.core.logging模块，这个模块提供了日志记录的功能，我们可以通过它记录程序运行过程中的信息，方便后期调试和分析
from app.core.logging import logging


# 定义ChatGPTAI类，这个类继承自ChatAI接口，实现了ChatAI接口中定义的所有抽象方法
class ChatGPTAI(ChatAI):
    """本地直接调用openai的接口"""

    # 定义构造方法，接受api_key、base_url和model三个参数
    def __init__(self, api_key: str, base_url: str = None, model: str = None):
        # 导入openai模块，这个模块提供了与OpenAI进行交互的功能
        from openai import OpenAI

        # 将传入的api_key赋值给实例变量self.api_key
        self.api_key = api_key
        # 创建OpenAI类的实例，将api_key作为参数传入，并将创建的实例赋值给实例变量self.client
        self.client = OpenAI(api_key=api_key)
        # 将传入的model赋值给实例变量self.model
        self.model = model
        # 如果传入了base_url，则将base_url赋值给self.client.base_url
        if base_url:
            self.client.base_url = base_url

    # 实现ChatAI接口中定义的invoke_greet抽象方法
    def invoke_greet(self, params: GreetParams) -> str:
        # 定义messages列表，包含一个字典，字典中包含role和content两个键
        messages = [
            {"role": "system", "content": f"你需要使用标识为 {params.language} 的语言来打个招呼，10字左右."}
        ]

        # 创建MessageInvokeDTO类的实例，将messages作为参数传入，并将创建的实例赋值给invoke_dto
        invoke_dto = MessageInvokeDTO(messages=messages)
        # 调用self._original_invoke_chat方法，将invoke_dto作为参数传入，并返回调用结果
        return self._original_invoke_chat(invoke_dto)

    # 实现ChatAI接口中定义的topic_invoke_greet抽象方法
    def topic_invoke_greet(self, params: TopicGreetParams) -> str:
        # 定义messages列表，包含一个字典，字典中包含role和content两个键
        messages = [
            {
                "role": "system",
                "content": f"场景：{params.prompt}. 现在你需要使用标识为 {params.language} 的语言来打个招呼，20字左右.",
            }
        ]

        # 创建MessageInvokeDTO类的实例，将messages作为参数传入，并将创建的实例赋值给invoke_dto
        invoke_dto = MessageInvokeDTO(messages=messages)
        # 调用self._original_invoke_chat方法，将invoke_dto作为参数传入，并返回调用结果
        return self._original_invoke_chat(invoke_dto)

    # 实现ChatAI接口中定义的invoke_message抽象方法
    def invoke_message(self, dto: MessageParams) -> AIMessageResult:
        """与AI自由聊天"""
        # 将dto.language赋值给局部变量language
        language = dto.language
        # 定义system_message字符串，包含一些系统消息
        system_message = (
                'The reply must be json, and format of json is {"message":"result of message","message_style":"must be one of the options '
                + f"{json.dumps(dto.styles, ensure_ascii=False)}"
                + '"}, '
                + f"The 'message_style'  within the square brackets . "
                + f"I want you to act as an {language} speaking partner and improver, your name is {dto.name}. "
                + f"No matter what language I speak to you, you need to reply me in {language}. "
                + f"I hope you will ask me a question from time to time in your reply "
        )

        # 定义messages列表，包含一个字典，字典中包含role和content两个键
        messages = [{"role": "system", "content": system_message}]
        # 遍历dto.messages中的每个元素，将每个元素添加到messages列表中
        for message in dto.messages:
            messages.append(message)
        # 调用self._original_invoke_chat_json方法，将MessageInvokeDTO(messages=messages)作为参数传入，并将调用结果赋值给resp
        resp = self._original_invoke_chat_json(MessageInvokeDTO(messages=messages))
        # 创建AIMessageResult类的实例，将resp["message"]和resp["message_style"]作为参数传入，并将创建的实例赋值给result
        result = AIMessageResult(
            message=resp["message"], message_style=resp["message_style"]
        )
        # 返回result
        return result

    # 实现ChatAI接口中定义的topic_invoke_message抽象方法
    def topic_invoke_message(self, dto: AITopicMessageParams) -> AITopicMessageResult:
        """与AI自由聊天"""
        # 将dto.language赋值给局部变量language
        language = dto.language
        # 定义system_message字符串，包含一些系统消息
        system_message = (
                f"Topic:{dto.prompt}.Please chat with me in this topic. If this conversation can be concluded or if the user wishes to end it, please return topic_completed=true."
                + 'The reply must be json, and format of json is {"message":"result of message","topic_completed":"Whether this topic has been completd.","message_style":"must be one of the options '
                + f"{json.dumps(dto.styles, ensure_ascii=False)}"
                + '"}, '
                + f"The 'message_style'  within the square brackets . "
                + f"I want you to act as an {language} speaking partner and improver, your name is {dto.name}. "
                + f"No matter what language I speak to you, you need to reply me in {language}. "
                + f"I hope you will ask me a question from time to time in your reply "
        )

        # 定义messages列表，包含一个字典，字典中包含role和content两个键
        messages = [{"role": "system", "content": system_message}]
        # 遍历dto.messages中的每个元素，将每个元素添加到messages列表中
        for message in dto.messages:
            messages.append(message)
        # 调用self._original_invoke_chat_json方法，将MessageInvokeDTO(messages=messages)作为参数传入，并将调用结果赋值给resp
        resp = self._original_invoke_chat_json(MessageInvokeDTO(messages=messages))
        # 定义message_style变量，初始值为None
        message_style = None
        # 如果resp中包含"message_style"键，则将resp["message_style"]赋值给message_style
        if "message_style" in resp:
            message_style = resp["message_style"]

        # 定义completed变量，初始值为False
        completed = False
        # 如果resp中包含"topic_completed"键，则将resp["topic_completed"] == "true"的结果赋值给completed
        if "topic_completed" in resp:
            completed = resp["topic_completed"] == "true"
        # 创建AITopicMessageResult类的实例，将resp["message"]、message_style和completed作为参数传入，并将创建的实例赋值给result
        result = AITopicMessageResult(
            message=resp["message"], message_style=message_style, completed=completed
        )
        # 返回result
        return result

    # 实现ChatAI接口中定义的topic_invoke_complete抽象方法
    def topic_invoke_complete(
            self, dto: AITopicCompleteParams
    ) -> AITopicCompleteResult:
        """
        场景结束方法，该方法用于处理对话结束的场景，它接收一个AITopicCompleteParams类型的参数，返回一个AITopicCompleteResult类型的结果。
        AITopicCompleteParams是一个数据类，包含了targets和messages两个属性，targets是一个字符串列表，表示目标，messages是一个MessageItemParams对象列表，表示消息。
        AITopicCompleteResult也是一个数据类，包含了targets、score、words和suggestion四个属性，targets是一个字符串，表示目标，score是一个字符串，表示分数，words是一个整数，表示单词数量，suggestion是一个字符串，表示建议。
        """
        # 定义system_content字符串，初始值为"下面是一场对话\n"，这是为了构造一个系统消息，用于引导AI进行处理
        system_content = "下面是一场对话\n"
        # 遍历dto.messages中的每个元素，这是为了将每个消息的内容添加到系统消息中
        for message in dto.messages:
            # 如果message.role的小写形式等于"system"，则将"AI: {message.content}\n"添加到system_content的末尾，这是为了将AI的消息添加到系统消息中
            if message.role.lower() == "system":
                system_content = system_content + f"AI: {message.content}\n"
            # 如果message.role的小写形式等于"account"，则将"用户: {message.content}\n"添加到system_content的末尾，这是为了将用户的消息添加到系统消息中
            elif message.role.lower() == "account":
                system_content = system_content + f"用户: {message.content}\n"

        # 将"下面是用户对话中需要实现的目标\n"添加到system_content的末尾，这是为了在系统消息中添加一个引导，提示AI需要实现的目标
        system_content = system_content + "下面是用户对话中需要实现的目标\n"
        # 遍历dto.targets中的每个元素，将每个元素添加到system_content的末尾，这是为了将每个目标添加到系统消息中
        for target in dto.targets:
            system_content = system_content + f"{target}\n"

        # 将一些系统消息添加到system_content的末尾，这是为了在系统消息中添加一些额外的引导，提示AI如何处理这个场景
        system_content = (
                system_content
                + "现在你需要计算出 <用户:> 所说的所有话中使用了多少单词数量（仅需要数字结果，重复单词不需要计算），对应后面的目标实现了多少个（仅需要数字结果），对用户的表达给出评分（满分100分，仅需要数字结果），还要给出300字以内的建议（包含中文讲解与英文示例），返回结果只需要有json格式,使用单词量放在words字段，目标实现数量放在targets字段，评分放在score字段，建议放在suggestion字段，不需要再额外的任何信息，记住，只需要统计<用户:>下的内容\n"
        )
        # 调用self._original_invoke_chat_json方法，将MessageInvokeDTO(messages=[{"role": "system", "content": system_content}])传入，返回其结果，赋值给json_result，这是为了获取AI的处理结果
        json_result = self._original_invoke_chat_json(
            MessageInvokeDTO(messages=[{"role": "system", "content": system_content}])
        )
        # 组装成AITopicCompleteResult返回，这是为了将AI的处理结果转换为AITopicCompleteResult类型的结果
        return AITopicCompleteResult(
            targets=json_result["targets"],
            score=json_result["score"],
            words=json_result["words"],
            suggestion=json_result["suggestion"],
        )

    # 定义invoke_translate方法，这个方法用于处理翻译任务，它接收一个TranslateParams类型的参数，返回一个字符串
    def invoke_translate(self, dto: TranslateParams) -> str:
        """
        翻译方法，该方法用于处理翻译任务，它接收一个TranslateParams类型的参数，返回一个字符串。
        TranslateParams是一个数据类，包含了target_language和content两个属性，target_language是一个字符串，表示目标语言，content是一个字符串，表示需要翻译的内容。
        """
        # 定义system_message字符串，其内容为"下面是段文本：'{dto.content}'   仅输出翻译成 {dto.target_language} 后的内容"，这是为了构造一个系统消息，用于引导AI进行翻译
        system_message = f"下面是段文本：'{dto.content}'   仅输出翻译成 {dto.target_language} 后的内容"
        # 创建MessageInvokeDTO的实例，将messages=[{"role": "system", "content": system_message}]传入，赋值给invoke_dto，这是为了构造一个消息调用数据传输对象，用于传递给AI
        invoke_dto = MessageInvokeDTO(
            messages=[{"role": "system", "content": system_message}]
        )
        # 调用self._original_invoke_chat方法，将invoke_dto传入，返回其结果，赋值给resp，这是为了获取AI的处理结果
        resp = self._original_invoke_chat(invoke_dto)
        # 返回resp，这是为了将AI的处理结果返回给调用者
        return resp

    # 定义invoke_grammar_analysis方法，这个方法用于处理语法分析任务，它接收一个GrammarAnalysisParams类型的参数，返回一个AIGrammarAnalysisResult类型的结果
    def invoke_grammar_analysis(
            self, params: GrammarAnalysisParams
    ) -> AIGrammarAnalysisResult:
        """
        语法分析方法，该方法用于处理语法分析任务，它接收一个GrammarAnalysisParams类型的参数，返回一个AIGrammarAnalysisResult类型的结果。
        GrammarAnalysisParams是一个数据类，包含了language和content两个属性，language是一个字符串，表示语言，content是一个字符串，表示需要分析的内容。
        AIGrammarAnalysisResult也是一个数据类，包含了is_correct、error_reason、correct_content和better四个属性，is_correct是一个布尔值，表示是否正确，error_reason是一个字符串，表示错误原因，correct_content是一个字符串，表示正确的内容，better是一个字符串，表示更好的。
        """
        # 定义messages列表，其元素为一个字典，字典的role键的值为"user"，content键的值为一个格式化字符串，这是为了构造一个用户消息，用于引导AI进行语法分析
        messages = [
            {
                "role": "user",
                "content": f"检查内容是否存在语法错误(不需要检查符号的使用)，如果存在就用中文返回这段内容中的语法错误，再提供一句推荐示例，要求数据格式为json，无任何转义字符，可直接被程序正常序列化，语法是否错误放在属性isCorrect中，错误原因放在errorReason中，修正后的正确示例放在correctContent中，推荐示例放在better中，正确示例与推荐示例的语言要使用{params.language},错误原因使用中文. 提供内容是:{params.content}",
            }
        ]
        # 创建MessageInvokeDTO的实例，将messages传入，赋值给invoke_dto，这是为了构造一个消息调用数据传输对象，用于传递给AI
        invoke_dto = MessageInvokeDTO(messages=messages)
        # 调用self._original_invoke_chat方法，将invoke_dto传入，返回其结果，赋值给result_data，这是为了获取AI的处理结果
        result_data = self._original_invoke_chat(invoke_dto)
        # 将result_data转换为json对象，赋值给result_json，这是为了将AI的处理结果转换为可以操作的数据结构
        result_json = json.loads(result_data)
        # 创建AIGrammarAnalysisResult的实例，将result_json中的isCorrect、errorReason、correctContent和better属性传入，赋值给result，这是为了将AI的处理结果转换为AIGrammarAnalysisResult类型的结果
        return AIGrammarAnalysisResult(
            is_correct=result_json["isCorrect"],
            error_reason=result_json["errorReason"],
            correct_content=result_json["correctContent"],
            better=result_json["better"],
        )

    # 定义invoke_prompt_sentence方法，这个方法是ChatGPTAI类的一个实例方法，用于处理提示句子任务
    def invoke_prompt_sentence(self, params: PromptSentenceParams) -> str:
        """
        这个方法接收一个PromptSentenceParams类型的参数，返回一个字符串。
        PromptSentenceParams是一个数据类，包含了language和messages两个属性，language是一个字符串，表示语言，messages是一个字典列表，表示消息。
        """
        # 使用logging模块的info方法记录请求参数的信息，这是为了方便后期调试和分析
        logging.info(f"request_params:{params}")
        # 定义system_content字符串，初始值为"下面是一场对话\n"，这是为了构造一个系统消息，用于引导AI进行处理
        system_content = "下面是一场对话\n"
        # 从后向前遍历params.messages中的每个元素，这是为了将每个消息的内容添加到系统消息中
        for message in reversed(params.messages):
            # 如果message["role"]的小写形式等于"user"，则将"用户: {message['content']}\n"添加到system_content的末尾，这是为了将用户的消息添加到系统消息中
            if message["role"].lower() == "user":
                system_content = system_content + f"用户: {message['content']}\n"
            else:
                # 如果message["role"]的小写形式不等于"user"，则将"AI: {message['content']}\n"添加到system_content的末尾，这是为了将AI的消息添加到系统消息中
                system_content = system_content + f"AI: {message['content']}\n"
        # 在system_content的末尾添加一段提示信息，这是为了引导AI进行处理
        system_content = (
                system_content
                + "现在你需要做为一个用户来回答下一句话，不可以有提供帮助与提问问题的意思，语言使用"
                + params.language
                + ", 直接输出内容前面不可以加 User:"
        )
        # 创建MessageInvokeDTO的实例，将messages=[{"role": "user", "content": system_content}]传入，赋值给invoke_dto，这是为了构造一个消息调用数据传输对象，用于传递给AI
        invoke_dto = MessageInvokeDTO(
            messages=[{"role": "user", "content": system_content}]
        )
        # 调用self._original_invoke_chat方法，将invoke_dto传入，返回其结果，赋值给resp，这是为了获取AI的处理结果
        resp = self._original_invoke_chat(invoke_dto)
        # 返回resp，这是为了将AI的处理结果返回给调用者
        return resp

    # 定义invoke_word_detail方法，这个方法是ChatGPTAI类的一个实例方法，用于处理单词详情任务
    def invoke_word_detail(self, params: WordDetailParams) -> AIWordDetailResult:
        # 使用logging模块的info方法记录请求参数的信息，这是为了方便后期调试和分析
        logging.info(f"request_dto:{params}")
        # 定义messages列表，包含一个字典，字典中包含role和content两个键，这是为了构造一个消息，用于引导AI进行处理
        messages = [
            {
                "role": "user",
                "content": f'提供一个单词，只需要简洁快速的用中文返回这个单词的音标与翻译，要求数据格式为json，音标放在属性phonetic中，音标的前后要加上"/"，翻译放在translation中， 这个单词是"{params.word}"',
            }
        ]
        # 创建MessageInvokeDTO的实例，将messages传入，赋值给invoke_dto，这是为了构造一个消息调用数据传输对象，用于传递给AI
        invoke_dto = MessageInvokeDTO(messages=messages)
        # 调用self._original_invoke_chat方法，将invoke_dto传入，返回其结果，赋值给result_data，这是为了获取AI的处理结果
        result_data = self._original_invoke_chat(invoke_dto)
        # 使用json模块的loads方法将result_data转换为Python对象，赋值给result_json，这是为了将AI的处理结果转换为可以直接使用的Python对象
        result_json = json.loads(result_data)
        # 创建AIWordDetailResult的实例，将result_json["phonetic"]和result_json["translation"]传入，赋值给result，这是为了构造一个单词详情结果对象，用于返回给调用者
        return AIWordDetailResult(
            phonetic=result_json["phonetic"], translation=result_json["translation"]
        )

    # 定义_original_invoke_chat_json方法，这个方法是ChatGPTAI类的一个实例方法，用于处理原始聊天任务
    def _original_invoke_chat_json(self, dto: MessageInvokeDTO):
        # 使用logging模块的info方法记录请求参数的信息，这是为了方便后期调试和分析
        logging.info(f"request_dto:{dto}")
        # 调用self.client.chat.completions.create方法，将model、temperature、messages、max_tokens和response_format作为参数传入，返回其结果，赋值给resp，这是为了获取AI的处理结果
        resp = self.client.chat.completions.create(
            model=self.model,
            temperature=dto.temperature,
            messages=dto.messages,
            max_tokens=dto.max_tokens,
            response_format={"type": "json_object"},
        )
        # 使用logging模块的info方法记录AI的处理结果，这是为了方便后期调试和分析
        logging.info(f"response:{resp}")
        # 从resp中获取第一个选项的消息内容，赋值给result，这是为了获取AI的处理结果
        result = resp.choices[0].message.content
        # 使用json模块的loads方法将result转换为Python对象，返回其结果，这是为了将AI的处理结果转换为可以直接使用的Python对象
        return json.loads(result)

    # 定义_original_invoke_chat方法，这个方法是ChatGPTAI类的一个实例方法，用于处理原始聊天任务
    def _original_invoke_chat(self, dto: MessageInvokeDTO):
        # 使用logging模块的info方法记录请求参数的信息，这是为了方便后期调试和分析
        logging.info(f"dto:{dto}")
        # 调用self.client.chat.completions.create方法，将model、temperature、messages和max_tokens作为参数传入，返回其结果，赋值给resp，这是为了获取AI的处理结果
        resp = self.client.chat.completions.create(
            model=self.model,
            temperature=dto.temperature,
            messages=dto.messages,
            max_tokens=dto.max_tokens,
        )
        # 使用logging模块的info方法记录AI的处理结果，这是为了方便后期调试和分析
        logging.info(f"response:{resp}")
        # 从resp中获取第一个选项的消息内容，赋值给result，这是为了获取AI的处理结果
        result = resp.choices[0].message.content
        # 使用strip方法去掉result两边的双引号，然后再使用strip方法去掉两边的单引号，这是为了去掉result两边的引号
        result = result.strip('"')
        result = result.strip("'")
        # 使用replace方法去掉result中的转义字符，这是为了去掉result中的转义字符
        result = result.replace('\\"', '"').replace("\\n", "\n").replace("\\", "")
        # 返回result，这是为了将AI的处理结果返回给调用者
        return result
