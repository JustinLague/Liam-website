FROM node:14-alpine3.11 as build-stage
WORKDIR /src
COPY package*.json ./
ENV NODE_ENV=production

RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

#RUN npm install
COPY ./ .
EXPOSE 3005
CMD [ "node", "/src/src/app.js" ]
