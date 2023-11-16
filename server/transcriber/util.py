from typing import List, Tuple, BinaryIO
from pydub import AudioSegment
from pydub.utils import make_chunks
from tempfile import NamedTemporaryFile
import math
import os

WAV_HEADER_SIZE_BYTES = 44


def compress_audio_file(file: BinaryIO) -> Tuple[BinaryIO, int]:
    file_format = file.name.split(".")[-1]
    audio = AudioSegment.from_file(file.name, file_format)

    compressed_file = NamedTemporaryFile("rb", suffix=".mp3")
    audio.export(compressed_file.name, "mp3", bitrate="64k")
    compressed_file.seek(0, os.SEEK_END)
    compressed_file_size = compressed_file.tell()
    compressed_file.seek(0, os.SEEK_SET)

    return compressed_file, compressed_file_size


def chunkify_mp3(
    file: BinaryIO, file_size: int, chunk_size_bytes: int
) -> List[BinaryIO]:
    # make use a psuedo max size to guarantee the mp3 chunks are less than the max size:
    # here I'm operating on the assumption that the frames for each header take up no
    # more than a tenth of the space in an mp3 file
    max_size = chunk_size_bytes * 9 / 10
    num_chunks = math.ceil(file_size / max_size)
    audio = AudioSegment.from_file(file.name, "mp3")
    audio_chunks = make_chunks(audio, len(audio) / num_chunks)
    files = [NamedTemporaryFile("rb", suffix=".mp3") for _ in range(num_chunks)]
    
    for i, audio_chunk in enumerate(audio_chunks):
        audio_chunk.export(files[i].name, "mp3", bitrate="64k")

    return files
