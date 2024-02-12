FROM python:3.8

WORKDIR /server
COPY ./ .
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "server:app"]