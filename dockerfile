FROM nginx:alpine AS base
WORKDIR /
EXPOSE 8080

FROM alpine:latest AS build
WORKDIR /
COPY . /src

# install dependancies
RUN apk add --no-cache \
        wget \
        libc6-compat \
        nodejs \
        yarn

CMD /bin/ash
RUN wget https://github.com/verless/verless/releases/download/v0.5.4/verless-linux-amd64.tar && \
    tar -xvf verless-linux-amd64.tar

WORKDIR /src/themes/default
RUN yarn

# verless statis site build
WORKDIR /src
RUN /verless build

FROM base AS final
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/target /usr/share/nginx/html

# set read permissions to html dir for nginx group
RUN chmod -R 777 /usr/share/nginx/html
