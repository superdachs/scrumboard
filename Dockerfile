FROM frolvlad/alpine-python3

MAINTAINER Stefan Kauerauf <mail@stefankauerauf.de>

ENV version 1

RUN ln -s /usr/bin/python3 /usr/bin/python

RUN mkdir /scrumboard

COPY scrumboard_backend /scrumboard/
COPY scrumboard_frontend/static /scrumboard/
COPY scrumboard_frontend/public /scrumboard/
COPY scrumboard_frontend/index.html /scrumboard/

RUN pip3 install -r /scrumboard/requirements.txt

CMD /scrumboard/manage.py runserver 0.0.0.0:8000
