# 定义ApiResponse类，这个类用于构建API的响应
class ApiResponse:
    # 初始化方法，接收四个参数，分别是code、status、data和message
    def __init__(self,
                 code: str = '200',  # code参数，默认值为'200'，表示响应的状态码
                 status: str = 'SUCCESS',  # status参数，默认值为'SUCCESS'，表示响应的状态
                 data=None,  # data参数，默认值为None，表示响应的数据
                 message: str = 'success'  # message参数，默认值为'success'，表示响应的消息
                 ):
        # 将参数赋值给实例的属性
        self.code = code  # code属性，表示响应的状态码
        self.status = status  # status属性，表示响应的状态
        self.data = data  # data属性，表示响应的数据
        self.message = message  # message属性，表示响应的消息