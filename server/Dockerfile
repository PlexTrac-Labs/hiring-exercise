FROM node:16.5.0

# setup build folders
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lcok.json
RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 5000
CMD ["node", "./build/index.js"]