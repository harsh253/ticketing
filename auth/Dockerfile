FROM node:alpine

WORKDIR /usr/app
COPY ./package.json /usr/app/
RUN npm install --only=prod

COPY ./ /usr/app/

CMD [ "npm", "start" ]