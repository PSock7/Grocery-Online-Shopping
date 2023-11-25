FROM node

WORKDIR /app/customer

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3501

CMD ["npm", "start"]