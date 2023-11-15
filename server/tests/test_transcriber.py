from common_fixtures import mock_srt_response, mock_transcript, mock_openai_transcribe
from transcriber import Transcript
from pydub import AudioSegment


def test_transcript_from_srt(mock_srt_response):
    transcript = Transcript.from_srt(mock_srt_response)

    assert len(transcript.transcript) == 23

    assert (
        transcript.transcript[0].text
        == "The Speech-to-Text API provides two endpoints, transcription and translation based upon your"
    )
    assert transcript.transcript[0].start == 0
    assert transcript.transcript[0].end == 9.88

    assert transcript.transcript[-1].text == "Where are you heading today?"
    assert transcript.transcript[-1].start == 103.16
    assert transcript.transcript[-1].end == 104.68


def test_transcript_append(mock_transcript):
    transcript1 = mock_transcript
    transcript2 = mock_transcript

    # test addition operator
    transcript = transcript1 + transcript2
    assert len(transcript.transcript) == 6
    assert transcript.transcript[0].text == transcript.transcript[3].text
    assert transcript.transcript[3].start == 28
    assert transcript.transcript[3].end == 33

    # test value increment operator
    transcript3 = mock_transcript
    transcript += transcript3
    assert len(transcript.transcript) == 9
    assert transcript.transcript[0].text == transcript.transcript[6].text
    assert transcript.transcript[6].start == 54
    assert transcript.transcript[6].end == 59
    

def test_transcribe_le_25MB_file(mock_openai_transcribe):
    bits_per_sample = 16 # cd quality
    sample_rate = 44_100 # 44.1 kHz
    channels = 2         # stereo
    
    bit_rate = bits_per_sample * sample_rate * channels
    desired_file_size = 25_000_000
    duration = (8 * desired_file_size) / bit_rate
    print("DURATION:", duration)
    print("BITRATE:", bit_rate)

    
    audio = AudioSegment.silent(duration * 1000)
    
    audio.export('file.wav', 'wav', bitrate=bit_rate)
    
    
