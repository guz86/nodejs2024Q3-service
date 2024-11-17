FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"

CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run start:dev"]

EXPOSE 4000
