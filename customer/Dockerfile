FROM node:20.10.0

WORKDIR /app/customer

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3501

CMD ["npm", "run", "dev"]