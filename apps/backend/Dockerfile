FROM node:20-alpine

WORKDIR /app

# Install system dependencies required by Prisma and wait-for-db logic
RUN apk add --no-cache openssl netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 4000

ENTRYPOINT ["sh", "entrypoint.sh"]
