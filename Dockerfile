FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/mydatabase?schema=public"

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run start:dev"]
