FROM python:3.8

WORKDIR /server
COPY ./ .
RUN pip install -r requirements.txt
RUN apt update && apt install wkhtmltopdf ffmpeg -y

CMD ["uvicorn", "server:app", "--host", "0.0.0.0"]
