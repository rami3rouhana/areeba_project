FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE ${NUMBER_VALIDATOR_SERVICE_PORT}

CMD ["npm", "start"]