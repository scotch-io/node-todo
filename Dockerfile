FROM node:8.11.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# COPY .sequelizerc ./

RUN npm install --global nodemon
RUN npm install
# Wil create cassandra keysapce and tables

# If you are building your code for production
# RUN npm install --only=production


# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "nodemon", "server.js" ]
