FROM node:20.10.0

WORKDIR /app/shopping

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3502

CMD ["npm", "start"]