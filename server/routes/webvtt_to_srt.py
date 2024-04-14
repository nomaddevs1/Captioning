import subprocess

# Function to convert WebVTT to SRT
def convert_webvtt_to_srt(webvtt_content):
    # Replace 'WEBVTT' with an empty string to get rid of the WebVTT header
    srt_content = webvtt_content.replace("WEBVTT", "")
    return srt_content

@router.post(
    "/add_captions/",
    responses={
        200: {"content": {"video/mp4": {}}},
        400: {"model": ErrorMessage},
    },
)
async def add_captions_to_video(
    video_file: UploadFile, captions_file: UploadFile
):
    # Save the video file
    video_filename = video_file.filename
    with open(video_filename, "wb") as f:
        f.write(video_file.file.read())

    # Save the captions file
    captions_filename = captions_file.filename
    with open(captions_filename, "wb") as f:
        f.write(captions_file.file.read())

    # Convert WebVTT to SRT if captions file is in WebVTT format
    if captions_filename.endswith(".vtt"):
        with open(captions_filename, "r") as f:
            webvtt_content = f.read()
        srt_content = convert_webvtt_to_srt(webvtt_content)
        # Write the SRT content back to the file
        with open(captions_filename, "w") as f:
            f.write(srt_content)

    # Use ffmpeg to overlay captions onto the video
    output_filename = "output.mp4"
    subprocess.run([
        "ffmpeg",
        "-i", video_filename,
        "-vf", f"subtitles={captions_filename}",
        "-c:a", "copy",
        output_filename
    ])

    # Read the output file and return it as a response
    with open(output_filename, "rb") as f:
        video_data = f.read()

    # Clean up temporary files
    os.remove(video_filename)
    os.remove(captions_filename)
    os.remove(output_filename)

    return Response(content=video_data, media_type="video/mp4")
