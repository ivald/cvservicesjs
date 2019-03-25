FROM node:latest as node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node server.js
#ENV NODE_ENV = production
#ENV PORT=3000
#EXPOSE $PORT
#docker build -t cvservicesjs:1.0 .
#docker tag cvservicesjs:1.0 ivald79/cvservicesjs:1.0
#docker push ivald79/cvservicesjs:1.0
#docker run -p 3000:3000 ivald79/cvservicesjs:1.0
