# 导入json模块，用于处理JSON数据，如将Python对象转换为JSON格式的字符串，或将JSON格式的字符串转换为Python对象
import json

# 导入azure.cognitiveservices.speech模块，这是Azure的语音服务SDK，提供了语音识别、语音合成等功能
import azure.cognitiveservices.speech as speechsdk

# 从app.config模块中导入Config类，这个类通常用于管理应用的配置信息，如数据库连接字符串、密钥等
from app.config import Config
# 从app.core.logging模块中导入logging对象，这是Python的标准日志库，用于记录应用运行过程中的信息，如调试信息、警告、错误等
from app.core.logging import logging
# 从app.core.language模块中导入所有内容，这个模块可能包含了处理语言相关的功能，如语言识别、翻译等
from app.core.language import *

# 从Config类中获取AZURE_KEY属性的值，赋值给key，这是为了获取Azure服务的访问密钥
key = Config.AZURE_KEY
# 定义region变量，赋值为"eastasia"，这是为了指定Azure服务的地理区域，"eastasia"表示东亚地区
region="eastasia"

# 创建SpeechConfig的实例，将key和region作为参数传入，赋值给speech_config，这是为了配置Azure的语音服务
# SpeechConfig类用于设置语音服务的配置信息，如订阅密钥、地理区域等
speech_config = speechsdk.SpeechConfig(subscription=key, region=region)

# 创建SpeechSynthesizer的实例，将speech_config作为参数传入，audio_config参数为None，赋值给speech_synthesizer
# SpeechSynthesizer类是语音合成器，用于将文本转换为语音，audio_config参数用于指定音频配置，如音频格式、采样率等，None表示使用默认配置
speech_synthesizer = speechsdk.SpeechSynthesizer(
    speech_config=speech_config, audio_config=None
)


def speech_default(content: str, output_path_str: str, language: str, voice_name: str|None = None):
    """默认语音合成  还是用不了，因为每次还要实例化 speech_synthesizer"""
    # 设置语音识别的语言，这里的language是函数的参数，表示要设置的语言
    speech_config.speech_recognition_language = language
    # 设置语音合成的语言，这里的language是函数的参数，表示要设置的语言
    speech_config.speech_synthesis_language = language
    # 如果没有指定voice_name（语音角色），则获取对应语言的默认角色
    if not voice_name:
        voice_name = get_azure_language_default_role(language)
    # 设置语音合成的语音角色
    speech_config.speech_synthesis_voice_name = voice_name
    # 调用speak_text_async方法进行语音合成，content是要合成的文本内容，get方法是为了获取异步操作的结果
    speech_synthesis_result = speech_synthesizer.speak_text_async(content).get()
    # 创建AudioDataStream对象，用于处理语音合成的结果
    audio_data_stream = speechsdk.AudioDataStream(speech_synthesis_result)

    # 判断语音合成的结果，如果合成成功，则将结果保存为wav文件
    if (
        speech_synthesis_result.reason
        == speechsdk.ResultReason.SynthesizingAudioCompleted
    ):
        audio_data_stream.save_to_wav_file(output_path_str)
    # 如果语音合成被取消，则记录错误信息，并抛出异常
    elif (
        speech_synthesis_result.reason
        == speechsdk.ResultReason.Canceled
    ):
        cancellation_details = speech_synthesis_result.cancellation_details
        logging.error(
            "Speech synthesis canceled: {}".format(cancellation_details.reason)
        )
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            if cancellation_details.error_details:
                logging.error(
                    "Error details: {}".format(cancellation_details.error_details)
                )
                logging.error(
                    "Did you set the speech resource key and region values?"
                )
        raise Exception("语音合成失败")
    # 如果语音合成失败，则记录错误信息，并抛出异常
    else:
        logging.error(
            "Speech synthesis failed: {}".format(speech_synthesis_result.reason)
        )
        raise Exception("语音合成失败")


def speech_by_ssml(
    content: str,
    output_path_str: str,
    voice_name: str,
    speech_rate: str,
    feel: str,
    targetLang: str,
):
    """可定制的文本转语音"""
    # 如果没有指定voice_name（语音角色），则获取对应语言的默认角色
    if not voice_name:
        voice_name = get_azure_language_default_role(targetLang)

    # 构造SSML（Speech Synthesis Markup Language）语音合成标记语言，用于控制语音合成的各种参数，如语音角色、语速、语调等
    ssml = f"""
    <speak version="1.0"  xmlns:mstts="https://www.w3.org/2001/mstts" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="{targetLang}">
      <voice name="{voice_name}">
        <prosody rate="{speech_rate}">
          <mstts:express-as style="{feel}" styledegree="1.5">
            {content}
          </mstts:express-as>
        </prosody>
      </voice>
    </speak>
    """
    # 记录SSML内容，用于调试
    logging.info(ssml)

    # 调用start_speaking_ssml_async方法进行语音合成，ssml是要合成的SSML内容，get方法是为了获取异步操作的结果
    speech_synthesis_result = speech_synthesizer.start_speaking_ssml_async(
        ssml
    ).get()  # Get the audio data stream

    # 创建AudioDataStream对象，用于处理语音合成的结果
    audio_data_stream = speechsdk.AudioDataStream(speech_synthesis_result)

    # 判断语音合成的结果，如果合成成功，则将结果保存为wav文件
    if (
        speech_synthesis_result.reason
        == speechsdk.ResultReason.SynthesizingAudioStarted
    ):
        logging.info("init 1")
        audio_data_stream.save_to_wav_file(output_path_str)
        logging.info("init 2")
    # 如果语音合成失败，则记录错误信息，并抛出异常
    else:
        logging.error(
            "Speech synthesis failed: {}".format(speech_synthesis_result.reason)
        )
        if speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = speech_synthesis_result.cancellation_details
            logging.error(
                "Speech synthesis canceled: {}".format(cancellation_details.reason)
            )
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                if cancellation_details.error_details:
                    logging.error(
                        "Error details: {}".format(cancellation_details.error_details)
                    )
                    logging.error(
                        "Did you set the speech resource key and region values?"
                    )
        raise Exception("语音合成失败")

def speech_pronunciation(content: str, speech_path: str, language: str = "en-US"):
    """发音评估"""
    audio_config = speechsdk.audio.AudioConfig(filename=speech_path)
    speech_config.speech_recognition_language = language
    speech_recognizer = speechsdk.SpeechRecognizer(
        speech_config=speech_config, audio_config=audio_config
    )
    # "{\"referenceText\":\"good morning\",\"gradingSystem\":\"HundredMark\",\"granularity\":\"Phoneme\",\"EnableMiscue\":true}" 通过dict生成json
    json_param = {
        "referenceText": content,
        "gradingSystem": "HundredMark",
        "granularity": "Word",
        "EnableMiscue": True,
    }
    pronunciation_assessment_config = speechsdk.PronunciationAssessmentConfig(
        json_string=json.dumps(json_param)
    )

    pronunciation_assessment_config.apply_to(speech_recognizer)

    speech_recognition_result = speech_recognizer.recognize_once()
    pronunciation_assessment_result = speechsdk.PronunciationAssessmentResult(
        speech_recognition_result
    )
    result = {
        "accuracy_score": pronunciation_assessment_result.accuracy_score,
        "fluency_score": pronunciation_assessment_result.fluency_score,
        "completeness_score": pronunciation_assessment_result.completeness_score,
        "pronunciation_score": pronunciation_assessment_result.pronunciation_score,
    }
    original_words = pronunciation_assessment_result.words
    result_words = []
    # 循环words，获取每个单词的发音评估结果
    for word in original_words:
        result_words.append(
            {
                "word": word.word,
                "accuracy_score": word.accuracy_score,
                "error_type": word.error_type,
            }
        )
    result["words"] = result_words
    return result


# 单词发单评估，可以精确到每一个音素
def word_speech_pronunciation(word: str, speech_path: str, language: str = "en-US"):
    audio_config = speechsdk.audio.AudioConfig(filename=speech_path)
    speech_config.speech_recognition_language = language
    speech_recognizer = speechsdk.SpeechRecognizer(
        speech_config=speech_config, audio_config=audio_config
    )
    # "{\"referenceText\":\"good morning\",\"gradingSystem\":\"HundredMark\",\"granularity\":\"Phoneme\",\"EnableMiscue\":true}" 通过dict生成json
    json_param = {
        "referenceText": word,
        "gradingSystem": "HundredMark",
        "granularity": "Phoneme",
        "EnableMiscue": True,
        "phonemeAlphabet": "IPA",
    }
    pronunciation_assessment_config = speechsdk.PronunciationAssessmentConfig(
        json_string=json.dumps(json_param)
    )

    pronunciation_assessment_config.apply_to(speech_recognizer)

    speech_recognition_result = speech_recognizer.recognize_once()
    pronunciation_assessment_result = speechsdk.PronunciationAssessmentResult(
        speech_recognition_result
    )
    result = {
        "accuracy_score": pronunciation_assessment_result.accuracy_score,
        "fluency_score": pronunciation_assessment_result.fluency_score,
        "completeness_score": pronunciation_assessment_result.completeness_score,
        "pronunciation_score": pronunciation_assessment_result.pronunciation_score,
    }
    original_words = pronunciation_assessment_result.words
    result_words = []
    # 循环words，获取每个单词的发音评估结果
    for word in original_words:

        # 获取音素评估结果
        phonemes = word.phonemes
        phonemes_list = []
        for phoneme in phonemes:
            phonemes_list.append(
                {
                    "phoneme": phoneme.phoneme,
                    "accuracy_score": phoneme.accuracy_score
                }
            )

        result_words.append(
            {
                "word": word.word,
                "accuracy_score": word.accuracy_score,
                "error_type": word.error_type,
                "phonemes": phonemes_list,
            }
        )
    result["words"] = result_words
    return result


# 语音转文字
def speech_translate_text(speech_path: str, language: str) -> str:
    # languages = ["zh-CN", "en-US"]
    languages = []
    # 如果languages已经包含了language，就不需要再添加了,不包含需要添加，并且放在第一位
    if language not in languages:
        languages.insert(0, language)
    auto_detect_source_language_config = (
        speechsdk.languageconfig.AutoDetectSourceLanguageConfig(languages=languages)
    )
    audio_config = speechsdk.audio.AudioConfig(filename=speech_path)

    speech_recognizer = speechsdk.SpeechRecognizer(
        speech_config=speech_config,
        auto_detect_source_language_config=auto_detect_source_language_config,
        audio_config=audio_config,
    )
    speech_recognition_result = speech_recognizer.recognize_once_async().get()
    if speech_recognition_result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("Recognized: {}".format(speech_recognition_result.text))
        return speech_recognition_result.text
    elif speech_recognition_result.reason == speechsdk.ResultReason.NoMatch:
        print(
            "No speech could be recognized: {}".format(
                speech_recognition_result.no_match_details
            )
        )
    elif speech_recognition_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_recognition_result.cancellation_details
        print("Speech Recognition canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(cancellation_details.error_details))
            print("Did you set the speech resource key and region values?")


# 获取支持的语音列表，组装成对象数组进行返回
def get_voice_list():
    """通过synthesizer.getVoicesAsync()方法来获取所有支持的语音列表"""
    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)
    voice_list = speech_synthesizer.get_voices_async().get()
    # 迭代list，组装成对象数组进行返回
    voice_vo_list = []
    for voice in voice_list.voices:
        voice_vo_list.append(
            {
                "gender": voice.gender.value,
                "locale": voice.locale,
                "local_name": voice.local_name,
                "name": voice.name,
                "short_name": voice.short_name,
                "voice_type": {
                    "name": voice.voice_type.name,
                    "value": voice.voice_type.value,
                },
                "style_list": voice.style_list,
            }
        )
    return voice_vo_list


# 获取支持的语音列表，组装成对象数组进行返回
def get_voice_list():
    """通过synthesizer.getVoicesAsync()方法来获取所有支持的语音列表"""
    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)
    voice_list = speech_synthesizer.get_voices_async().get()
    # 迭代list，组装成对象数组进行返回
    voice_vo_list = []
    for voice in voice_list.voices:
        voice_vo_list.append(
            {
                "gender": voice.gender.value,
                "locale": voice.locale,
                "local_name": voice.local_name,
                "name": voice.name,
                "short_name": voice.short_name,
                "voice_type": {
                    "name": voice.voice_type.name,
                    "value": voice.voice_type.value,
                },
                "style_list": voice.style_list,
            }
        )
    return voice_vo_list

voice_vo_list = get_voice_list()
# 获取azure语音配置，并且按 locale 分组
azure_voice_configs = voice_vo_list

azure_voice_configs_group = {}
for azure_voice_config in azure_voice_configs:
    if azure_voice_config["locale"] not in azure_voice_configs_group:
        azure_voice_configs_group[azure_voice_config["locale"]] = []
    azure_voice_configs_group[azure_voice_config["locale"]].append(azure_voice_config)

def get_azure_voice_role_by_short_name(short_name: str):
    """根据short_name获取语音配置"""
    local = short_name.rsplit('-', 1)[0]
    azure_voice_configs = azure_voice_configs_group[local]
    # 迭代azure_voice_configs，找到item中short_name与settings.speech_role_name相同的item，取local_name
    result = None
    for item in azure_voice_configs:
        if item["short_name"] == short_name:
            return item
    # 抛出异常
    raise Exception("未找到对应的语音配置")    