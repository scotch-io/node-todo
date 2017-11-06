FROM node:9.0.0
WORKDIR /app
COPY package.json .
RUN npm install
RUN export NODE_ENV=prod
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]