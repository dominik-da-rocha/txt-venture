FROM node:15.11.0-buster as builder
RUN apt update -y & apt install git -y
RUN git clone https://github.com/dominik-da-rocha/txt-venture.git
RUN cd txt-venture 
RUN npm install
RUN npm run build

