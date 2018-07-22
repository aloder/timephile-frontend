FROM node:10.4.1 as builder

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM node:10.4.1
COPY --from=builder /usr/src/app/build /usr/src/app/build
RUN npm i -g serve
EXPOSE 80
CMD ["serve","-s", "/usr/src/app/build", "-p", "80"]