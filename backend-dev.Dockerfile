FROM node:16-alpine3.11

RUN apk add --update --no-cache \
    python \
    python-dev \
    py-pip \
    build-base \
    git \
    openssh-client \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    && pip install virtualenv \
    && rm -rf /var/cache/apk/*

# Set up lerna and top level dependencies
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
ENV PATH /srv/app/node_modules/.bin:$PATH

# Copy dependencies
COPY packages/backend/package.json ./packages/backend/package.json
COPY lerna.json ./
RUN npm run bootstrap

# Copy source
COPY packages/backend ./packages/backend
RUN npm run compile

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD ["npm","start"]