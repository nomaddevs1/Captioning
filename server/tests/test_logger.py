from logger import init_logger
import logging


def test_log_to_file():
    init_logger("/tmp/transcript_app.log")
    logging.info("Hello World!")

    lines = None
    with open("/tmp/app.log") as file:
        lines = file.readlines()

    assert lines[0] == "Hello World!\n"
