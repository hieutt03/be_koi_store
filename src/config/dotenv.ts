import dotenv from "dotenv";

dotenv.config();

export default {
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "123456",
    DB_NAME: process.env.DB_NAME || "koi-store",
    PORT: Number(process.env.PORT) || 8080,
};