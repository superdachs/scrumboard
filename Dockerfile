FROM frolvlad/alpine-python3

MAINTAINER Stefan Kauerauf <mail@stefankauerauf.de>

ENV version 1

RUN ln -s /usr/bin/python3 /usr/bin/python

RUN mkdir /scrumboard

COPY scrumboard_backend /scrumboard/
RUN mkdir -p /scrumboard/scrumboard_backend/static
COPY scrumboard_frontend/static /scrumboard/scrumboard_backend/static/
COPY scrumboard_frontend/public /scrumboard/scrumboard_backend/static/

