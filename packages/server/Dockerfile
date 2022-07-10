FROM node:18
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm i

COPY . /app

CMD ["npm", "start"]
