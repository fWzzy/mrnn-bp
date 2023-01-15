FROM node:18 as development

WORKDIR /app

ENV NODE_ENV=development
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

CMD ["yarn", "start"]

FROM nginx:stable-alpine as production

WORKDIR /usr/share/nginx/html

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN rm -rf ./*

COPY --from=development /app/build .
COPY --from=development /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]