FROM node:lts as webBuilder
MAINTAINER livo

ADD ./ /lico_web_manage
WORKDIR /lico_web_manage
RUN npm install && npm run-script build

FROM nginx:stable-alpine
MAINTAINER livo
ENV TZ : 'Asia/Shanghai'
COPY --from=webBuilder /lico_web_manage/build /usr/share/nginx/html