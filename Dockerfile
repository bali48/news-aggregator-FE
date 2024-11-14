FROM node:20.1.0 as build

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install


RUN npm run build


FROM nginx:1.25.3 

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]