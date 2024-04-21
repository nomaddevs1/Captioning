from fastapi import APIRouter, File, UploadFile, Response, Form
from models.status import ErrorMessage
from typing import List
import subprocess
import tempfile
import os
import logging
import re

router = APIRouter()

logging.basicConfig(level=logging.INFO)  # Set the logging level

def process_video_with_captions(video_path: str, ass_path: str, output_path: str):
    """
    Process the video with captions using ffmpeg.

    Args:
        video_path (str): Path to the original video file.
        ass_path (str): Path to the ASS file containing the captions.
        output_path (str): Path where the processed video with captions will be saved.
        video_resolution (tuple): Resolution of the video file (width, height).
    """
    logging.info("Processing video with captions...")
    # Command to overlay captions from ASS file onto the video using ffmpeg

    command = [
        "ffmpeg",
        "-itsoffset", "0.45",        # Offset at an attempt to reduce delay
        "-i", video_path,         # Input video file
        "-vf", f"ass={ass_path}",  # Overlay captions from ASS file
        "-c:a", "copy",           # Copy audio codec
        output_path               # Output path for processed video
    ]
    
    # Execute the ffmpeg command
    subprocess.run(command)

def get_video_resolution(video_path: str) -> tuple:
    """
    Get the resolution of the video file using FFmpeg.

    Args:
        video_path (str): Path to the video file.

    Returns:
        tuple: Resolution of the video (width, height).
    """
    # FFmpeg command to probe video file and extract resolution
    try:
        # FFmpeg command to probe video file and extract resolution
        set_file_permissions(video_path, '400')
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
        logging.info(f"Video resolution: {width}x{height}")
        return width, height
    except subprocess.CalledProcessError as e:
        # Handle subprocess error
        print("FFmpeg command failed:", e)
        raise  # Re-raise the exception for the caller to handle
    except Exception as e:
        # Handle other exceptions
        print("An error occurred:", e)
        raise  # Re-raise the exception for the caller to handle

def set_file_permissions(file_path, mode):
    """
    Set permissions for a file.

    Args:
        file_path (str): Path to the file.
        mode (str): Permission mode (e.g., 'rwxr-xr--').

    Returns:
        None
    """
    try:
        # Convert mode string to octal representation
        mode_octal = int(mode, 8)
        # Set permissions for the file
        os.chmod(file_path, mode_octal)
        print(f"Permissions set for file: {file_path}")
    except Exception as e:
        print(f"Error setting permissions for file: {e}")


def set_caption_coordinates(video_resolution: tuple, xscale: int, yscale: int) -> tuple:
    # Set the coordinates for captions based on scaling values and video resolution.
    logging.info(f"Video resolution: {video_resolution}")
    logging.info(f"Scales: {xscale}x, {yscale}y")
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
    logging.info("Received video and ASS files")
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
                logging.info(f"ASS file content after replacing placeholders: {ass_content}")
                # Write the modified content back to the ASS file
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