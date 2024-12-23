FROM node:20.13.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["ls", "-la"]
CMD ["npm", "run", "start"]