from fastapi import APIRouter, File, UploadFile, Response, Form
from models.status import ErrorMessage
from typing import List
import subprocess
import tempfile
import os
import logging
import re

router = APIRouter()

def process_video_with_captions(video_path: str, ass_path: str, output_path: str):
    """
    Process the video with captions using ffmpeg.

    Args:
        video_path (str): Path to the original video file.
        ass_path (str): Path to the ASS file containing the captions.
        output_path (str): Path where the processed video with captions will be saved.
        video_resolution (tuple): Resolution of the video file (width, height).
    """
    # Command to overlay captions from ASS file onto the video using ffmpeg

    command = [
        "ffmpeg",
        "-i", video_path,         # Input video file
        "-vf", f"ass={ass_path}",  # Overlay captions from ASS file
        "-c:a", "copy",           # Copy audio codec
        output_path               # Output path for processed video
    ]
    # Execute the ffmpeg command
    subprocess.run(command)

def get_video_resolution(video_path: str) -> tuple:
    try:
        # FFmpeg command to probe video file and extract resolution
        command = [
            "ffprobe",
            "-v", "error",
            "-select_streams", "v:0",
            "-show_entries", "stream=width,height",
            "-of", "csv=p=0:s=x",
            video_path
        ]
        # Execute FFmpeg command
        output = subprocess.check_output(command, stderr=subprocess.STDOUT).decode("utf-8").strip()
        width, height = map(int, output.split('x'))
        return width, height
    except subprocess.CalledProcessError as e:
        # Handle subprocess error
        print("FFmpeg command failed:", e)
        raise
    except Exception as e:
        print("An error occurred:", e)
        raise

def set_caption_coordinates(video_resolution: tuple, xscale: int, yscale: int) -> tuple:
    # Set the coordinates for captions based on scaling values and video resolution.
    x = int(round(xscale / 100 * video_resolution[0]))
    y = int(round(yscale / 100 * video_resolution[1]))
    return x, y

@router.post("/process-video-with-captions/")
async def process_video_with_captions_route(
    video_file: UploadFile = File(...),
    ass_file: UploadFile = File(...),
    xscale: int = Form(...),
    yscale: int = Form(...)
):
    try:
        # Save the uploaded files to temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            video_path = os.path.join(temp_dir, video_file.filename)
            ass_path = os.path.join(temp_dir, ass_file.filename)

            # Write video file to disk
            with open(video_path, "wb") as video:
                video.write(await video_file.read())

            # Write ASS file to disk
            with open(ass_path, "wb") as ass:
                ass.write(await ass_file.read())

            # Get video resolution using FFmpeg
            video_resolution = get_video_resolution(video_path)
            
            # Set caption coordinates based on scaling values and video resolution
            x, y = set_caption_coordinates(video_resolution, xscale, yscale)
            
            # Read ASS file content
            with open(ass_path, "r") as ass_file:
                ass_content = ass_file.read()

            with open(ass_path, "w") as ass_file:
                # Replace placeholders "x" and "y" with calculated coordinates
                ass_content = ass_content.replace("{x}", str(x))
                ass_content = ass_content.replace("{y}", str(y))
                ass_content = ass_content.replace("{xres}", str(video_resolution[0]))
                ass_content = ass_content.replace("{yres}", str(video_resolution[1]))
                ass_file.write(ass_content)


            # Process video with captions
            output_path = os.path.join(temp_dir, "processed_video.mp4")
            process_video_with_captions(video_path, ass_path, output_path)

            # Send processed video file as response
            with open(output_path, "rb") as processed_video:
                return Response(content=processed_video.read(), media_type="video/mp4")
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return ErrorMessage(error=str(e), status_code=500)