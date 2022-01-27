# pull base image
FROM node:14.18.3-alpine

# set working directory
WORKDIR /src

# add `/node_modules/.bin` to $PATH
ENV PATH src/node_modules/.bin:$PATH

# install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

EXPOSE 5000

# start app
CMD ["npm", "run", "dev"]