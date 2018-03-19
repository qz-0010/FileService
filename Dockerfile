FROM node:carbon

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY src/package*.json ./
COPY src/client/package*.json ./

RUN npm i webpack -g
RUN npm i webpack-cli -g
RUN npm i
RUN npm i -C client
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY src /app

EXPOSE 3000
CMD [ "npm", "start" ]