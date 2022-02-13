FROM node:16-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine as production

WORKDIR /app

COPY --from=build /app/public .
COPY ./nginx.conf /etc/nginx/nginx.conf