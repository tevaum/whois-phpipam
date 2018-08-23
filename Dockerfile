FROM node:10-alpine

ADD . /app
WORKDIR /app

RUN apk --no-cache add git && \
    npm install && \
    cd node_modules/node-phpipam && \
    npm install && npm run prepare && \
    cd ../..

CMD npm start
