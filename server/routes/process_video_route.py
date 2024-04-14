from fastapi import APIRouter, File, UploadFile, Response
from models.status import ErrorMessage
from typing import List
import subprocess
import tempfile
import os
import logging

router = APIRouter()

logging.basicConfig(level=logging.INFO)  # Set the logging level

def process_video_with_captions(video_path: str, ass_path: str, output_path: str):
    """
    Process the video with captions using ffmpeg.

    Args:
        video_path (str): Path to the original video file.
        ass_path (str): Path to the ASS file containing the captions.
        output_path (str): Path where the processed video with captions will be saved.
    """
    logging.info("Processing video with captions...")
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

@router.post("/process-video-with-captions/")
async def process_video_with_captions_route(
    video_file: UploadFile = File(...),
    ass_file: UploadFile = File(...)
):
    logging.info("Recieved video and ASS files")
    try:
        # Save the uploaded files to temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            video_path = os.path.join(temp_dir, video_file.filename)
            ass_path = os.path.join(temp_dir, ass_file.filename)

            
            with open(video_path, "wb") as video:
                video.write(await video_file.read())

            with open(ass_path, "wb") as ass:
                ass.write(await ass_file.read())
            with open(ass_path, "r") as ass_file:
                ass_content = ass_file.read()
                logging.info(f"ASS file content: {ass_content}")
                
            # Process video with captions
            output_path = os.path.join(temp_dir, "processed_video.mp4")
            process_video_with_captions(video_path, ass_path, output_path)

            # Send processed video file as response
            with open(output_path, "rb") as processed_video:
                return Response(content=processed_video.read(), media_type="video/mp4")
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return ErrorMessage(error=str(e), status_code=500)
