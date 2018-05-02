FROM quay.io/codaisseur/codaisseur-ts-ci:8.2

LABEL maintainer="Codaisseur <developers@codaisseur.com>"

RUN apk add --no-cache --virtual .build-deps \
    ca-certificates \
    wget \
    tar && \
    cd /usr/local/bin && \
    wget https://yarnpkg.com/latest.tar.gz && \
    tar zvxf latest.tar.gz && \
    ln -s /usr/local/bin/dist/bin/yarn.js /usr/local/bin/yarn.js && \
    apk del .build-deps

RUN apk --no-cache update && \
    apk --no-cache add bash python postgresql-dev build-base && \
    rm -rf /var/cache/apk/*

WORKDIR /app

ADD ./package.json /app
ADD ./yarn.lock /app

RUN yarn install && \
  npm install -g nodemon && \
  npm rebuild bcrypt --build-from-source

ENTRYPOINT "/bin/bash"

CMD ["yarn start"]
