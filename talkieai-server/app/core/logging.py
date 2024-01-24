# 导入Python内置的logging模块，这个模块提供了强大的日志记录功能
import logging

# 调用logging模块的basicConfig函数，这个函数用于配置日志系统
# level参数设置了日志系统的日志级别，logging.INFO表示只记录INFO级别及以上的日志
# format参数设置了日志的格式，'%(asctime)s - %(name)s - %(levelname)s - %(message)s'表示日志的格式为：时间 - 名称 - 级别 - 消息
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')