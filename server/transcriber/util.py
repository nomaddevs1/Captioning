from typing import List, BinaryIO
from pydub import AudioSegment


def chunkify(file: BinaryIO) -> List[BinaryIO]:
    file_format = file.name.split(".")[-1]

    uncompressed_audio = None
    if file_format == "wav":
        pass
    else:
        pass
