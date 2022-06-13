FROM node:16.14.0

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN mkdir -p /music-player-project

WORKDIR /music-player-project

COPY package*.json /music-player-project

RUN npm ci

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]