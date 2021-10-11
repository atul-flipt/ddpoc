FROM node:14
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y iproute2

COPY package*.json ./
RUN npm install


COPY . .

CMD [ "./start.sh" ]
