FROM node:latest

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 6000

CMD [ "yarn", "start" ]