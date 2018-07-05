FROM node:10.4.1 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

ADD package.json /usr/src/app/package.json
ADD yarn.lock /usr/src/app/yarn.lock
RUN yarn install --frozen-lockfile
COPY . /usr/src/app
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-p 80" "./build/"]