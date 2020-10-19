FROM node:14.2.0

WORKDIR /usr/app

COPY package.json .

RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

COPY ./src .
COPY test-zeebe.bpmn ./src
ENV ZEEBE_ADDRESS=zeebe:26500