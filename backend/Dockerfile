FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install bcrypt

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3001

CMD ["npm", "run", "start"]