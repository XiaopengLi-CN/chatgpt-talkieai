# 导入json模块，这个模块提供了JSON的编码和解码功能
import json
# 导入app.core.logging模块，这个模块提供了日志记录的功能
from app.core.logging import logging

# 定义一个空列表，命名为language_data，这个列表用于存储语言数据
language_data = []

# 定义一个空字典，命名为azure_data，这个字典用于存储Azure的数据
azure_data = {}
# 使用with语句打开"data/azure.json"文件，文件打开模式为"r"（读取模式）
with open("data/azure.json", "r") as f:
    # 使用json模块的load方法读取文件内容，并将其解码为Python对象，然后赋值给azure_data
    azure_data = json.load(f)

# 定义一个空列表，命名为azure_style_label_data，这个列表用于存储Azure的样式标签数据
azure_style_label_data = []
# 使用with语句打开"data/azure_style_label.json"文件，文件打开模式为"r"（读取模式）
with open("data/azure_style_label.json", "r") as f:
    # 使用json模块的load方法读取文件内容，并将其解码为Python对象，然后赋值给azure_style_label_data
    azure_style_label_data = json.load(f)

# 定义一个空字典，命名为azure_style_label_map，这个字典用于存储Azure的样式标签映射
azure_style_label_map = {}
# 使用for语句遍历azure_style_label_data中的每个元素
for item in azure_style_label_data:
    # 将元素的"value"键对应的值作为键，"label"键对应的值作为值，添加到azure_style_label_map中
    azure_style_label_map[item["value"]] = item["label"]

# 定义一个空字典，命名为sys_language_data，这个字典用于存储系统语言数据
sys_language_data = {}
# 使用with语句打开"data/sys_language.json"文件，文件打开模式为"r"（读取模式）
with open("data/sys_language.json", "r") as f:
    # 使用json模块的load方法读取文件内容，并将其解码为Python对象，然后赋值给sys_language_data
    sys_language_data = json.load(f)

# 定义get_label_by_language函数，这个函数接收一个字符串作为参数，返回对应的标签
def get_label_by_language(language: str) -> str:
    # 使用for语句遍历sys_language_data中的每个元素
    for item in sys_language_data:
        # 如果元素的"value"键对应的值等于传入的语言，则返回元素的"label"键对应的值
        if item["value"] == language:
            return item["label"]
    # 如果没有找到对应的语言，则抛出异常
    raise Exception("没有找到对应的语言:{language}")

# 定义get_azure_style_label函数，这个函数接收一个字符串作为参数，返回对应的标签
def get_azure_style_label(style: str):
    # 使用if语句检查azure_style_label_map是否包含传入的样式
    if style in azure_style_label_map:
        # 如果包含，则返回对应的值
        return azure_style_label_map[style]
    # 如果不包含，则使用logging模块的warning方法记录警告信息，并返回空字符串
    logging.warning(f"没有找到对应的style:{style}")
    return ""

# 定义get_azure_language_default_role函数，这个函数接收一个字符串作为参数，返回对应的默认角色
def get_azure_language_default_role(language: str):
    # 使用for语句遍历sys_language_data中的每个元素
    for item in sys_language_data:
        # 如果元素的"value"键对应的值等于传入的语言，则返回元素的"default_voice_role_name"键对应的值
        if item["value"] == language:
            return item["default_voice_role_name"]
    # 如果没有找到对应的语言，则抛出异常
    raise Exception(f"没有找到对应的语言:{language}")

# 定义get_role_info_by_short_name函数，这个函数接收一个字符串作为参数，返回对应的角色信息
def get_role_info_by_short_name(short_name: str):
    # 使用for语句遍历sys_language_data中的每个元素
    for item in sys_language_data:
        # 如果元素的"short_name"键对应的值等于传入的短名称，则返回元素
        if item["short_name"] == short_name:
            return item
    # 如果没有找到对应的角色，则抛出异常
    raise Exception(f"没有找到对应的角色:{short_name}")