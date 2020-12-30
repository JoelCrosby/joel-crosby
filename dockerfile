FROM nginx:latest AS base
WORKDIR /

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
RUN wget https://github.com/verless/verless/releases/download/v0.5.3/verless-linux-amd64.tar && \
    tar -xvf verless-linux-amd64.tar

WORKDIR /src/themes/default
RUN yarn

# verless statis site build
WORKDIR /src
RUN /verless build

FROM base AS final
COPY --from=build /src/target /usr/share/nginx/html
