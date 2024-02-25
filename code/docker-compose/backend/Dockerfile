FROM node:latest

WORKDIR /app

COPY ./backend-code/package*.json  ./

RUN npm install

COPY ./backend-code/*  ./

EXPOSE 3001

CMD ["npm", "start"]
