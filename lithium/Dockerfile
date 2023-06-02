FROM python:3.8.3-slim-buster

ENV PYTHONUNBUFFERED 1

WORKDIR /lithium
COPY requirements.txt requirements.txt

RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt
COPY . .