FROM node:20-alpine AS builder

WORKDIR /koi-store/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /koi-store/backend

COPY --from=builder /koi-store/backend .

ENV NODE_ENV=production

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "serve"]
