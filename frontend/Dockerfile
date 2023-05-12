FROM node:current-alpine3.17
WORKDIR /user/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm","start" ]