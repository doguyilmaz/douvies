FROM node:14

WORKDIR /douvies-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start