# old angular wants old node
FROM node:14-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY angular.json .
COPY browserslist .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .
COPY src ./src
RUN npm run prod

FROM httpd:2.4-alpine
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build /usr/src/app/dist .
