FROM node:16

WORKDIR /app

COPY package.json package-*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80", "--single"]