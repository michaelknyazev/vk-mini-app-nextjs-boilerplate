FROM node:14.15.0-alpine

WORKDIR /app
COPY . .

ENV MODE=production

EXPOSE 3000

CMD ["yarn", "start"]