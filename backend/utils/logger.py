from loguru import logger

logger.add("soc_agent.log", rotation="1 MB")

def log_event(message: str):
    logger.info(message)
