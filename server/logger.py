import logging
from logging import StreamHandler
from logging.handlers import RotatingFileHandler
import sys


def init_logger(log_file: str = None):
    logging.getLogger().setLevel(logging.DEBUG)
    if log_file != None:
        logging.getLogger().addHandler(
            RotatingFileHandler(
                filename=log_file, maxBytes=10 * 1024 * 1024, backupCount=5
            )
        )
        logging.getLogger().addHandler(StreamHandler(sys.stdout))
