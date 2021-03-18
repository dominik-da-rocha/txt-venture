FROM node:14.11.0-buster as builder
RUN apt update -y & apt install git -y
RUN git clone https://github.com/dominik-da-rocha/txt-venture.git

WORKDIR /txt-venture
RUN npm update
RUN npm install

ENTRYPOINT ["npm", "start"]

EXPOSE 3000

