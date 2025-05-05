FROM node:22.15-alpine3.20
WORKDIR /app
COPY . /app

RUN npm i
RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/app.js" ]