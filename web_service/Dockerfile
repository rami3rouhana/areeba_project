FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE ${WEB_SERVICE_PORT}

CMD ["npm", "start"]