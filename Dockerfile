# Dockerfile for deploy to heroku
FROM node

# set default port
ENV PORT=8081
# set Server default port
# need in building image to bind server port
ARG SERVER_PORT=8080

WORKDIR /

# install dependencies
# build app
COPY . .
RUN npm install
# bind SERVER_PORT to build config
RUN SERVER_PORT=$SERVER_PORT npm run build
# COPY /dist /app

# install serve
RUN npm install -g serve
WORKDIR /dist
RUN yarn global add serve

# Run not as root user (need for heroku.app)
RUN useradd -d /dist -m app
USER app

# EXPOSE $PORT

CMD exec serve -p $PORT -s .
