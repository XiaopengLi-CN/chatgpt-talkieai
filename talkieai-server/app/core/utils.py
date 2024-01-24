# 导入hashlib模块，这个模块提供了常见的哈希算法，如SHA1、SHA224、SHA256、SHA384、SHA512、SHA3、和MD5等
import hashlib

# 导入os模块，这个模块提供了丰富的方法用来处理文件和目录
import os

# 导入shutil模块，这个模块提供了一种高级的文件，文件集合，以及文件系统的操作方式
import shutil

# 导入string模块，这个模块包含了各种常用的字符串常量，如ascii_letters、digits等
import string

# 导入time模块，这个模块提供了各种操作时间的函数
import time

# 导入datetime模块中的datetime和timedelta类，这些类提供了日期和时间处理的功能
from datetime import datetime, timedelta

# 导入uuid模块中的UUID类，这个类用于生成全局唯一的标识符
from uuid import UUID

# 导入random模块，这个模块实现了各种分布的伪随机数生成器
import random

# 导入jwt模块，这个模块提供了JSON Web Token的实现
import jwt

# 导入fastapi模块中的UploadFile类，这个类用于处理上传的文件
from fastapi import UploadFile

# 导入app.config模块中的Config类，这个类包含了应用的配置信息
from app.config import Config

# 定义short_uuid函数，这个函数用于生成一个短的、唯一的标识符
def short_uuid() -> str:
    """64-bit characters reduced to 8-bit characters.
    link https://blog.csdn.net/dqchouyang/article/details/70230863
    """
    uuidChars = ("a", "b", "c", "d", "e", "f",
                 "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
                 "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
                 "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
                 "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
                 "W", "X", "Y", "Z")
    uuid = str(uuid4()).replace('-', '')
    result = ''
    for i in range(0, 8):
        sub = uuid[i * 4: i * 4 + 4]
        x = int(sub, 16)
        result += uuidChars[x % 0x3E]
    return result

# 定义uuid4函数，这个函数用于生成一个随机的UUID
def uuid4():
    """Generate a random UUID."""
    return UUID(bytes=os.urandom(16), version=4)

# 定义digest_password函数，这个函数用于对密码进行SHA256哈希
def digest_password(password: str):
    """Sha256 digest password"""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# 定义generate_code函数，这个函数用于生成一个4位的随机数字验证码
def generate_code():
    """Generate a 4 random letter verification code"""
    code = ''.join(random.sample(string.digits, 6))
    return code

# 定义date_to_str函数，这个函数用于将日期对象转换为字符串
def date_to_str(date):
    return date.strftime("%Y-%m-%d %H:%M:%S")

# 定义day_to_str函数，这个函数用于将日期对象转换为字符串，时间部分为00:00:00
def day_to_str(date):
    return date.strftime("%Y-%m-%d 00:00:00")

# 定义friendly_time函数，这个函数用于将日期时间字符串转换为友好的时间差表达方式
def friendly_time(dt):
    """
    将日期时间字符串转换为友好的时间差表达方式。

    参数：
    dt -- 日期时间字符串，格式为YYYY-MM-DD HH:MM:SS

    返回值：
    友好的时间差表达方式，例如：1分钟前、1小时前、1天前等等。
    """
    now = datetime.now()
    then = datetime.strptime(dt, '%Y-%m-%d %H:%M:%S')
    diff = now - then

    if diff < timedelta(seconds=60):
        return '刚刚'
    elif diff < timedelta(minutes=1):
        return f'{diff.seconds}秒前'
    elif diff < timedelta(hours=1):
        return f'{diff.seconds // 60}分钟前'
    elif diff < timedelta(days=1):
        return f'{diff.seconds // 3600}小时前'
    elif diff < timedelta(days=30):
        return f'{diff.days}天前'
    elif diff < timedelta(days=365):
        return f'{diff.days // 30}个月前'
    else:
        return f'{diff.days // 365}年前'

# 定义save_file函数，这个函数用于保存上传的文件，并返回文件名
def save_file(upload_file: UploadFile) -> str:
    # 获取upload_file文件后缀名
    file_ext = get_file_ext(upload_file.filename)

    filename = f'{short_uuid()}{file_ext}'
    file_path = f'{Config.TEMP_SAVE_FILE_PATH}/{filename}'
    if not os.path.exists(Config.TEMP_SAVE_FILE_PATH):
        os.makedirs(Config.TEMP_SAVE_FILE_PATH)
    with open(file_path, 'wb') as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return filename

# 定义file_get_path函数，这个函数用于获取文件的完整路径
def file_get_path(filename: str) -> str:
    return f'{Config.TEMP_SAVE_FILE_PATH}/{filename}'

# 定义get_file_ext函数，这个函数用于获取文件的后缀名
def get_file_ext(filename: str) -> str:
    return os.path.splitext(filename)[1]

# 定义get_date_str函数，这个函数用于获取当前日期的字符串表示，格式为yyyymmdd
def get_date_str():
    return time.strftime("%Y%m%d", time.localtime())

# 定义save_image_file函数，这个函数用于保存上传的图片文件，并返回文件名
def save_image_file(upload_file: UploadFile) -> str:
    # 获取upload_file文件后缀名
    file_ext = get_file_ext(upload_file.filename)
    filename = f'{short_uuid()}{file_ext}'

    file_full_path = image_file_get_path(filename)

    # 检查文件的目录是否存在，如果不存在就创建
    if not os.path.exists(os.path.dirname(file_full_path)):
        os.makedirs(os.path.dirname(file_full_path))

    with open(file_full_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return filename

# 定义save_voice_file函数，这个函数用于保存上传的语音文件，并返回文件名
def save_voice_file(upload_file: UploadFile, prefix='') -> str:
    # 获取upload_file文件后缀名
    file_ext = get_file_ext(upload_file.filename)
    filename = f'{prefix}_{short_uuid()}{file_ext}'

    file_full_path = voice_file_get_path(filename)

    # 检查文件的目录是否存在，如果不存在就创建
    if not os.path.exists(os.path.dirname(file_full_path)):
        os.makedirs(os.path.dirname(file_full_path))

    with open(file_full_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return filename

# 定义voice_file_get_path函数，这个函数用于获取语音文件的完整路径
def voice_file_get_path(filename: str) -> str:
    result = f"{Config.TEMP_SAVE_FILE_PATH}/voices/{filename}"
    # 检查full_file_name文件的所属目录是否存在，不存在则创建新的目录
    if not os.path.exists(os.path.dirname(result)):
        os.makedirs(os.path.dirname(result))
    return result

# 定义image_file_get_path函数，这个函数用于获取图片文件的完整路径
def image_file_get_path(filename: str) -> str:
    return f"{Config.TEMP_SAVE_FILE_PATH}/images/{filename}"


# 获取文件的后缀名
def get_file_ext(filename: str) -> str:
    return os.path.splitext(filename)[1]
