FROM node:12.10.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.5

COPY . /app

CMD ng serve --host 0.0.0.0

# sudo docker build -t applaudo:dev .
# sudo docker run -v ${PWD}:/app -v /app/node_modules -p 4201:4200 --rm applaudo:dev