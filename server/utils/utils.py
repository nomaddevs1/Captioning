import re


def parse_srt(srt_string):
    # Split the SRT string into blocks
    blocks = srt_string.strip().split("\n\n")
    transcript_data = []

    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) >= 3:
            # Extract the index, time range, and text
            index = int(lines[0])
            time_range = lines[1]
            text = " ".join(lines[2:])

            # Extract the start and end times
            match = re.match(r"(\d+:\d+:\d+,\d+) --> (\d+:\d+:\d+,\d+)", time_range)
            if match:
                start_time_str, end_time_str = match.groups()
                start_time = srt_time_to_seconds(start_time_str)
                end_time = srt_time_to_seconds(end_time_str)

                # Append the data to the transcript data list
                transcript_data.append(
                    {"start": start_time, "end": end_time, "text": text}
                )

    return transcript_data


def srt_time_to_seconds(time_str):
    # Convert an SRT time string to seconds
    hours, minutes, seconds, milliseconds = map(int, re.split(r"[:,]", time_str))
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000


def duration_detector(length):
    hours = length // 3600
    length %= 3600
    mins = length // 60
    length %= 60
    seconds = length

    return hours, mins, seconds
