FROM node:lts as webBuilder
MAINTAINER livo

ADD ./ /web
WORKDIR /web
RUN npm install  && npm run-script build

FROM nginx:stable-alpine
MAINTAINER livo
ENV TZ : 'Asia/Shanghai'
COPY --from=webBuilder /web/build /usr/share/nginx/html