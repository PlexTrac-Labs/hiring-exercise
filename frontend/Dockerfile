# pull base image
FROM node:14.18.3-alpine

# set working directory
WORKDIR /src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH src/app/node_modules/.bin:$PATH

# add app environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_JWT_KEY_ID
ENV REACT_APP_API_URL http://localhost:5000/
ENV REACT_APP_JWT_KEY_ID plex-jwt

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]