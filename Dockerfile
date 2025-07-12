FROM node:22-alpine

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]