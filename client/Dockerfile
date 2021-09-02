FROM node:16.5.0 as build

# setup build folders
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install

COPY . /usr/src/app

# build
ENV environment="development"
RUN npm run build:${environment}

FROM nginx:1.21.1-alpine as deploy
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]