FROM node:18-alpine
WORKDIR /app
COPY ./packages/server .
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000