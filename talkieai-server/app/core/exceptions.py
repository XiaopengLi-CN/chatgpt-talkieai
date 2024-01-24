# 定义UserAccessDeniedException类，这个类继承自Python内置的Exception类
# 这个类用于表示用户访问资源受限的异常，当用户试图访问他没有权限访问的资源时，可以抛出这个异常
class UserAccessDeniedException(Exception):
    # 这个类没有定义任何方法，所以我们使用pass语句来表示类体的结束
    pass


# 定义UserPasswordIncorrectException类，这个类继承自Python内置的Exception类
# 这个类用于表示用户密码不正确的异常，当用户输入的密码与存储的密码不匹配时，可以抛出这个异常
class UserPasswordIncorrectException(Exception):
    # 这个类没有定义任何方法，所以我们使用pass语句来表示类体的结束
    pass


# 定义ParameterIncorrectException类，这个类继承自Python内置的Exception类
# 这个类用于表示参数不正确的异常，当函数或方法接收到的参数不满足预期条件时，可以抛出这个异常
class ParameterIncorrectException(Exception):
    # 这个类没有定义任何方法，所以我们使用pass语句来表示类体的结束
    pass