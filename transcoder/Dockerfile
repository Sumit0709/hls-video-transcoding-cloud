FROM ubuntu:focal

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

RUN apt-get install -y ffmpeg


WORKDIR /home/app

COPY transcode.sh /home/app
COPY start.sh /home/app

COPY download.js /home/app/
COPY upload.js /home/app/
COPY package*.json /home/app/

# COPY .env /home/app/

RUN npm install

RUN chmod +x transcode.sh
RUN chmod +x start.sh
RUN chmod +x download.js
RUN chmod +x upload.js

ENTRYPOINT [ "/home/app/start.sh" ]
# ENTRYPOINT [ "bash" ]
# ENTRYPOINT [ "node", "upload.js" ]