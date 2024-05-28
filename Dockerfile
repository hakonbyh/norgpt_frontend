FROM --platform=linux/amd64 node:16-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM --platform=linux/amd64 nginx:1.21.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]