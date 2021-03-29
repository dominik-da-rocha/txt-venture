FROM node:14.11.0-buster as build
RUN apt update -y & apt install git -y
RUN git clone https://github.com/dominik-da-rocha/txt-venture.git

WORKDIR /txt-venture
RUN npm update
RUN npm install
RUN npm run build


FROM nginx:stable as runtime

COPY --from=build /txt-venture/build /usr/share/nginx/html 

EXPOSE 80
