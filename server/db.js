import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "interflow",
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});

export const toMysqlDate = (value = new Date()) => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date();
  }

  return date;
};

export const toIsoString = (value) => {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};
