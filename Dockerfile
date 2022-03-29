FROM node:16.14.2

RUN mkdir /app
WORKDIR /app
COPY ["package.json", "package-lock.json*", "/app/"]

RUN npm install

COPY . /app/

CMD [ "npm", "start" ]