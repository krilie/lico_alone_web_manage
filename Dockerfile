FROM node:lts as webBuilder
MAINTAINER livo

ADD ./ /lico_web_manage
WORKDIR /lico_web_manage
RUN cd /lico_web_manage/ckeditor5-custom-build && npm install && npm run build \
    && cd /lico_web_manage \
    && npm link ./ckeditor5-custom-build \
    && npm install --production && npm run-script build

FROM nginx:stable-alpine
MAINTAINER livo
ENV TZ : 'Asia/Shanghai'
COPY --from=webBuilder /lico_web_manage/build /usr/share/nginx/html