FROM node:13.5.0

WORKDIR /usr/app

COPY package.json .

RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

COPY ./src .
COPY ./bin/zbctl ./zbctl
COPY test-zeebe.bpmn .

ENV ZEEBE_ADDRESS=zeebe:26500