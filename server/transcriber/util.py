from typing import List, BinaryIO
from pydub import AudioSegment
from pydub.utils import mediainfo, make_chunks
from tempfile import NamedTemporaryFile
import math

WAV_HEADER_SIZE_BYTES = 44


def chunkify_audio_file(file: BinaryIO, chunk_size_bytes: int) -> List[BinaryIO]:
    file_format = file.name.split(".")[-1]
    audio = AudioSegment.from_file(file.name, file_format)

    sample_width = audio.sample_width
    sample_rate = audio.frame_rate
    channels = audio.channels

    total_seconds = len(audio) / 1000
    total_file_size = (
        sample_rate * channels * sample_width * total_seconds
    ) + WAV_HEADER_SIZE_BYTES

    num_chunks = math.ceil(total_file_size / (chunk_size_bytes - WAV_HEADER_SIZE_BYTES))
    audio_chunks = make_chunks(audio, 1000 * total_seconds / num_chunks)

    files = [NamedTemporaryFile("w+b", suffix=".wav") for _ in range(num_chunks)]
    for i, audio_chunk in enumerate(audio_chunks):
        audio_chunk.export(files[i].name, "wav")

    return files
