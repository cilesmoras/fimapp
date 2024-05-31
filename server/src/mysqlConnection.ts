import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

const connection = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

export default connection;
