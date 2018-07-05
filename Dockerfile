FROM node:10.4.1 as builder

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
RUN npm install -g serve
CMD serve -p 4500 -s build
EXPOSE 5000

# Install all dependencies of the current project.
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production