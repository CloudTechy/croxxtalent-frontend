# # FROM node:latest
FROM node:alpine  as build-stage
WORKDIR /var/www/croxxtalent-frontend
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx:alpine as production-stage
# RUN mkdir /app
# COPY --from=build-stage /var/www/croxxtalent-frontend/dist /usr/share/nginx/html;
COPY --from=build-stage /var/www/croxxtalent-frontend/dist /var/www/croxxtalent-frontend
# COPY docker/nginx/conf.d/frontend.conf /etc/nginx/conf.d/frontend.conf