FROM nginx:alpine AS base
WORKDIR /
EXPOSE 80

FROM alpine:latest AS build
WORKDIR /
COPY . /src

# install dependancies
RUN apk add --no-cache \
        hugo

# build hugo static site
WORKDIR /src
RUN hugo

# copy nginx config & static assets
FROM base AS final
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/public /usr/share/nginx/html

# set read permissions to html nginx dir
RUN chmod -R 755 /usr/share/nginx/html
