# 导入fastapi模块中的APIRouter、Depends、Request，这些是FastAPI框架中的核心组件，用于构建API路由和处理HTTP请求
from fastapi import APIRouter, Depends, Request
# 导入sqlalchemy.orm模块中的Session，这是SQLAlchemy库中的一个核心组件，用于管理数据库会话
from sqlalchemy.orm import Session
# 导入app.core模块中的get_current_account函数，这个函数用于获取当前登录的用户账号
from app.core import get_current_account
# 导入app.db模块中的get_db函数，这个函数用于获取数据库会话
from app.db import get_db
# 导入app.models.account_models模块，这个模块包含了我们项目中定义的所有账号相关的数据模型
from app.models.account_models import *
# 导入app.models.response模块中的ApiResponse类，这个类用于构造API的响应数据
from app.models.response import ApiResponse
# 导入app.services.account_service模块中的AccountService类，这个类提供了账号相关的服务，如登录、注册等
from app.services.account_service import AccountService
# 导入app.services.chat_service模块中的ChatService类，这个类提供了聊天相关的服务，如发送消息、接收消息等
from app.services.chat_service import ChatService

# 创建APIRouter的实例，赋值给router，这个实例将用于定义API路由
router = APIRouter()


# 使用router的post方法定义一个API路由，这个路由对应的URL路径为"/account/visitor-login"，名称为"Visitor login"
@router.post("/account/visitor-login", name="Visitor login")
# 定义visitor_login函数，这个函数将作为上面定义的API路由的处理函数，它接收一个Request实例、一个VisitorLoginDTO实例和一个Session实例作为参数
def visitor_login(
        request: Request, dto: VisitorLoginDTO, db: Session = Depends(get_db)
):
    """用户访客登录，一个IP只能有一个访客，如果ip已经生成了访客"""
    # 从request的client属性中获取客户端的主机地址，赋值给client_host
    client_host = request.client.host

    # 如果client_host为空，则返回一个ApiResponse实例，其中code为"400"，status为"FAILED"，message为"client_host 不能为空"
    if not client_host:
        return ApiResponse(code="400", status="FAILED", message="client_host 不能为空")
    # 如果dto的fingerprint属性为空，则返回一个ApiResponse实例，其中code为"400"，status为"FAILED"，message为"dto.fingerprint 不能为空"
    if not dto.fingerprint:
        return ApiResponse(code="400", status="FAILED", message="dto.fingerprint 不能为空")

    # 从request的headers属性中获取"User-Agent"字段的值，赋值给user_agent
    user_agent = request.headers["User-Agent"]
    # 创建AccountService的实例，将db传入，赋值给account_service
    account_service = AccountService(db)
    # 调用account_service的visitor_login方法，将dto的fingerprint属性、client_host和user_agent传入，返回其结果，赋值给data
    data = account_service.visitor_login(dto.fingerprint, client_host, user_agent)
    # 返回一个ApiResponse实例，其中data为上面获取的data
    return ApiResponse(data=data)


# 使用router的get方法定义一个API路由，这个路由对应的URL路径为"/account/info"，名称为"Get User info"
@router.get("/account/info", name="Get User info")
# 定义get_account_info函数，这个函数将作为上面定义的API路由的处理函数，它接收一个Session实例和一个字符串作为参数
def get_account_info(
        db: Session = Depends(get_db), account_id: str = Depends(get_current_account)
):
    """获取用户信息"""
    # 创建AccountService的实例，将db传入，赋值给account_service
    account_service = AccountService(db)
    # 调用account_service的get_account_info方法，将account_id传入，返回其结果，赋值给data
    data = account_service.get_account_info(account_id)
    # 返回一个ApiResponse实例，其中data为上面获取的data
    return ApiResponse(data=data)


# 使用router的post方法定义一个API路由，这个路由对应的URL路径为"/account/settings"
@router.post("/account/settings")
# 定义account_settings_api函数，这个函数将作为上面定义的API路由的处理函数，它接收一个AccountSettingsDTO实例、一个Session实例和一个字符串作为参数
def account_settings_api(
        dto: AccountSettingsDTO,
        db: Session = Depends(get_db),
        account_id: str = Depends(get_current_account),
):
    """用户保存设置"""
    # 创建AccountService的实例，将db传入，赋值给account_service
    account_service = AccountService(db)
    # 调用account_service的save_settings方法，将dto和account_id传入，返回其结果，赋值给data
    data = account_service.save_settings(dto, account_id)
    # 返回一个ApiResponse实例，其中data为上面获取的data
    return ApiResponse(data=data)


# 使用router的get方法定义一个API路由，这个路由对应的URL路径为"/account/settings"
@router.get('/account/settings')
# 定义get_account_settings_api函数，这个函数将作为上面定义的API路由的处理函数，它接收一个Session实例和一个字符串作为参数
def get_account_settings_api(
        db: Session = Depends(get_db),
        account_id: str = Depends(get_current_account),
):
    """获取用户设置"""
    # 创建AccountService的实例，将db传入，赋值给account_service
    account_service = AccountService(db)
    # 调用account_service的get_settings方法，将account_id传入，返回其结果，赋值给data
    data = account_service.get_settings(account_id)
    # 返回一个ApiResponse实例，其中data为上面获取的data
    return ApiResponse(data=data)


# 使用router的post方法定义一个API路由，这个路由对应的URL路径为"/account/role"，名称为"Update User role"
@router.post("/account/role", name="Update User role")
# 定义update_role函数，这个函数将作为上面定义的API路由的处理函数，它接收一个UpdateRoleDTO实例、一个Session实例和一个字符串作为参数
def update_role(
        dto: UpdateRoleDTO,
        db: Session = Depends(get_db),
        account_id: str = Depends(get_current_account),
):
    """选择角色"""
    # 创建AccountService的实例，将db传入，赋值给account_service
    account_service = AccountService(db)
    # 调用account_service的update_role_setting方法，将dto和account_id传入，返回其结果，赋值给data
    data = account_service.update_role_setting(dto, account_id)
    # 返回一个ApiResponse实例，其中data为上面获取的data
    return ApiResponse(data=data)


# 使用router的get方法定义一个API路由，这个路由对应的URL路径为"/account/role"，名称为"Get User role"
@router.get("/account/role", name="Get User role")
# 定义get_account_role函数，这个函数将作为上面定义的API路由的处理函数，它接收一个Session实例和一个字符串作为参数
def get_account_role(
        db: Session = Depends(get_db), account_id: str = Depends(get_current_account)
):
    """获取选择的角色"""
    # 创建AccountService的实例，将db传入，赋值给account_service
    account_service = AccountService(db)
    # 调用account_service的get_role_setting方法，将account_id传入，返回其结果，赋值给data
    data = account_service.get_role_setting(account_id)
    # 返回一个ApiResponse实例，其中data为上面获取的data
    return ApiResponse(data=data)


# 使用router的get方法定义一个API路由，这个路由对应的URL路径为"/account/collect"
@router.get("/account/collect")
# 定义get_account_collect_api函数，这个函数将作为上面定义的API路由的处理函数，它接收一个字符串、一个Session实例和一个字符串作为参数
def get_account_collect_api(
        type: str,
        message_id: str = None,
        content: str = None,
        db: Session = Depends(get_db),
        account_id: str = Depends(get_current_account),
):
    """获取用户收藏状态"""
    # 创建AccountService的实例，将db传入，赋值给account_service
    account_service = AccountService(db)
    # 创建CollectDTO的实例，将type、message_id和content传入，赋值给collect_dto
    collect_dto = CollectDTO(type=type, message_id=message_id, content=content)
    # 调用account_service的get_collect方法，将collect_dto和account_id传入，返回其结果，赋值给data
    data = account_service.get_collect(collect_dto, account_id)
    # 返回一个ApiResponse实例，其中data为上面获取的data
    return ApiResponse(data=data)


# 使用FastAPI的APIRouter的post方法定义一个API路由，这个路由对应的URL路径为"/account/collect"
@router.post("/account/collect")
# 定义account_collect_api函数，这个函数将作为上面定义的API路由的处理函数
def account_collect_api(
        # 这个函数接收一个CollectDTO实例作为参数，这个实例包含了用户想要保存的单词或句子的信息
        dto: CollectDTO,
        # 这个函数接收一个Session实例作为参数，这个实例是SQLAlchemy库中的一个核心组件，用于管理数据库会话
        db: Session = Depends(get_db),
        # 这个函数接收一个字符串作为参数，这个字符串是当前登录的用户账号的ID
        account_id: str = Depends(get_current_account),
):
    # 这个函数的功能是用户保存单词与句子的接口
    """用户保存单词与句子的接口"""
    # 创建AccountService的实例，将db传入，赋值给account_service，这个实例将用于提供账号相关的服务
    account_service = AccountService(db)
    # 调用account_service的collect方法，将dto和account_id传入，返回其结果，赋值给data，这个方法的功能是保存用户的单词或句子
    return ApiResponse(data=account_service.collect(dto, account_id))


# 使用FastAPI的APIRouter的delete方法定义一个API路由，这个路由对应的URL路径为"/account/collect"
@router.delete("/account/collect")
# 定义account_collect_api函数，这个函数将作为上面定义的API路由的处理函数
def account_collect_api(
        # 这个函数接收一个CollectDTO实例作为参数，这个实例包含了用户想要取消保存的单词或句子的信息
        dto: CollectDTO,
        # 这个函数接收一个Session实例作为参数，这个实例是SQLAlchemy库中的一个核心组件，用于管理数据库会话
        db: Session = Depends(get_db),
        # 这个函数接收一个字符串作为参数，这个字符串是当前登录的用户账号的ID
        account_id: str = Depends(get_current_account),
):
    # 这个函数的功能是取消用户保存的单词或者句子
    """取消用户保存的单词或者句子"""
    # 创建AccountService的实例，将db传入，赋值给account_service，这个实例将用于提供账号相关的服务
    account_service = AccountService(db)
    # 调用account_service的cancel_collect方法，将dto和account_id传入，返回其结果，赋值给data，这个方法的功能是取消保存用户的单词或句子
    return ApiResponse(data=account_service.cancel_collect(dto, account_id))


# 使用FastAPI的APIRouter的get方法定义一个API路由，这个路由对应的URL路径为"/account/collects"
@router.get("/account/collects")
# 定义get_account_collects_api函数，这个函数将作为上面定义的API路由的处理函数
def get_account_collects_api(
        # 这个函数接收一个字符串作为参数，这个字符串表示收藏类型
        type: str,
        # 这个函数接收一个整数作为参数，这个整数表示页码，初始值为1
        page: int = 1,
        # 这个函数接收一个整数作为参数，这个整数表示每页的数量，初始值为10
        page_size: int = 10,
        # 这个函数接收一个Session实例作为参数，这个实例是SQLAlchemy库中的一个核心组件，用于管理数据库会话
        db: Session = Depends(get_db),
        # 这个函数接收一个字符串作为参数，这个字符串是当前登录的用户账号的ID
        account_id: str = Depends(get_current_account),
):
    # 这个函数的功能是获取用户收藏的列表信息，包含分页效果
    """获取用户收藏的列表信息，包含分页效果"""
    # 创建AccountService的实例，将db传入，赋值给account_service，这个实例将用于提供账号相关的服务
    account_service = AccountService(db)
    # 调用account_service的get_collects方法，将type、page、page_size和account_id传入，返回其结果，赋值给data，这个方法的功能是获取用户收藏的列表信息
    return ApiResponse(
        data=account_service.get_collects(type, page, page_size, account_id)
    )
