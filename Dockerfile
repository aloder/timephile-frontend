FROM node:10.4.1 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ADD package.json /usr/src/app/package.json
RUN npm install -g yarn
RUN yarn
RUN yarn build

FROM nginx:1.13.3-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx/default.conf /etc/nginx/conf.default
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]