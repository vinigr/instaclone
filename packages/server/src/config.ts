import dotenvSafe from "dotenv-safe";
import path from "path";

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root(".env"),
  sample: root(".env.example"),
  allowEmptyValues: true,
});

export const config = {
  PORT: process.env.PORT || 9950,
  JWT_SECRET: process.env.JWT_SECRET || "secret_jwt",
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/instaclone",
};
