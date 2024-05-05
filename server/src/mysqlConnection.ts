import dotenv from "dotenv";
import mysql, { Pool } from "mysql2";
dotenv.config();

const connection: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default connection;
