FROM node:10-alpine

ADD . /app
WORKDIR /app

RUN npm install --production

CMD npm start
