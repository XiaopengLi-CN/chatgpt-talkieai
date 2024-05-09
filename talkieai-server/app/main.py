# 导入FastAPI，FastAPI是一个用于构建API的现代、快速（高性能）的web框架，基于Starlette（星级）的路由，依赖于Pydantic的模型。
from fastapi import FastAPI
# 导入CORS中间件，CORS（跨源资源共享）是一种安全机制，允许web应用的服务器允许其资源被访问。
from starlette.middleware.cors import CORSMiddleware
# 导入JSONResponse，它是一个返回JSON格式数据的响应对象。
from starlette.responses import JSONResponse

# 从app.config模块导入Config类，这个类用于管理应用的配置信息。
from app.config import Config
# 从app.core.exceptions模块导入UserAccessDeniedException类，这个类用于表示用户访问被拒绝的异常。
from app.core.exceptions import UserAccessDeniedException
# 从app.core.logging模块导入logging对象，这个对象用于记录应用的日志信息。
from app.core.logging import logging
# 从app.models.response模块导入ApiResponse类，这个类用于表示API的响应信息。
from app.models.response import ApiResponse

# 从各个路由模块导入路由对象，这些对象用于处理不同的API请求。
from app.api.sys_routes import router as sys_routes
from app.api.account_routes import router as account_routes
from app.api.message_routes import router as message_routes
from app.api.session_routes import router as session_routes
from app.api.topics_route import router as topic_routes

# 创建FastAPI应用实例，这个实例是整个web应用的核心，用于处理所有的API请求。
app = FastAPI()

# 使用add_middleware方法添加CORS中间件，这个中间件用于处理跨源资源共享。
app.add_middleware(
    # 指定中间件的类型为CORS中间件。
    CORSMiddleware,
    # 允许所有源访问资源。
    allow_origins=["*"],
    # 允许发送cookie。
    allow_credentials=True,
    # 允许所有HTTP方法。
    allow_methods=["*"],
    # 允许所有HTTP头。
    allow_headers=["*"],
)

# 使用include_router方法添加各个路由对象，这些路由对象用于处理不同的API请求。
app.include_router(account_routes, prefix=f"{Config.API_PREFIX}/v1")
app.include_router(topic_routes, prefix=f"{Config.API_PREFIX}/v1")
app.include_router(sys_routes, prefix=f"{Config.API_PREFIX}/v1")
app.include_router(session_routes, prefix=f"{Config.API_PREFIX}/v1")
app.include_router(message_routes, prefix=f"{Config.API_PREFIX}/v1")

# 使用exception_handler装饰器添加全局异常处理函数，这个函数用于处理所有未被捕获的异常。
@app.exception_handler(Exception)
async def conflict_error_handler(_, exc: Exception):
    # 使用logging对象的error方法记录异常信息。
    logging.error(exc)
    # 返回JSONResponse对象，这个对象包含了异常的详细信息。
    return JSONResponse(
        # 设置响应头，允许跨源访问。
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        # 设置响应内容，使用ApiResponse对象的字典形式表示异常信息。
        content=ApiResponse(code="500", status="FAILED", message=str(exc)).__dict__,
    )

# 使用exception_handler装饰器添加特定异常处理函数，这个函数用于处理UserAccessDeniedException异常。
@app.exception_handler(UserAccessDeniedException)
async def user_access_denied_error_handler(_, exc: UserAccessDeniedException):
    # 使用logging对象的error方法记录异常信息。
    logging.error(exc)
    # 返回JSONResponse对象，这个对象包含了异常的详细信息。
    return JSONResponse(
        # 设置响应头，允许跨源访问。
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        # 设置响应内容，使用ApiResponse对象的字典形式表示异常信息。
        content=ApiResponse(code="403", status="FAILED", message=str(exc)).__dict__,
    )