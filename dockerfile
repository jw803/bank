FROM node:16.13.1-alpine3.15

ENV NODE_ENV production

ENV EMAIL pretsocloud@gmail.com

ENV CLIENTID 959174344616-oi3ingirga5bg6gahsp6gfdb27gjhnen.apps.googleusercontent.com

ENV CLIENTSECRET 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

ENV ACCESSTOKEN ya29.A0ARrdaM9DixspZXXK35VFLQ11JNvMAC7u8lG6Fdf8-Kd9zYu_zn8unLNqZCrgCX7x_CX2nCXPLudQmTE6WaNspHrXZJY3nIAJtC3FO42tM6xIzBiPAZYvQhes30x8PvjzHj2jdAS-PDC5F9gRoPsyX4X-wHZq

ENV REFRESHTOKEN 1//04FfGk8L58RnzCgYIARAAGAQSNwF-L9IrNJwDJ_0yAGLVOenl2gSxkL5IKmKg7S_336p-OX6PY7bTAU5hfCdVn927-PrFm6uf8pY

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 3100

CMD ["npm", "run", "start"]