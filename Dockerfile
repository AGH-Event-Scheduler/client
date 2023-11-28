# pull base image
FROM node:20.8.0-slim

# add in your own IP that was assigned by EXPO for your local machine
ENV REACT_NATIVE_PACKAGER_HOSTNAME="20.215.12.1"

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
RUN apt-get update && apt-get install -y qemu-user-static

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/my-app && chown root:root /opt/my-app
WORKDIR /opt/my-app
ENV PATH /opt/my-app/.bin:$PATH
USER root
COPY package.json package-lock.json ./
RUN yarn install


# copy in our source code last, as it changes the most
WORKDIR /opt/my-app
# for development, we bind mount volumes; comment out for production
COPY . /opt/my-app/

CMD ["npx","expo", "start", "--clear"]
