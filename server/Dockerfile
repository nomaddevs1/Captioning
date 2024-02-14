FROM python:3.8

RUN apt update && apt install wkhtmltopdf ffmpeg -y
ENV APP_ADDRESS='0.0.0.0'
ENV APP_PORT='8000'
ENV APP_MODE='PROD'
WORKDIR /server
COPY ./ .
RUN pip install -r requirements.txt

CMD ["python3", "server.py"]
