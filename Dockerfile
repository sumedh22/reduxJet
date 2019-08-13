FROM node:11-alpine
WORKDIR /app
COPY ./web .
CMD npm install serve && node_modules/serve/bin/serve.js -l 5000