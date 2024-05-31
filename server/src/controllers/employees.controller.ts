import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";
import { Employees } from "../types/employees.types";

const DB_TABLE = "employees";
const TABLE_LABEL = "Employee";

export async function fetchEmployees() {
  const query = `SELECT * FROM ${DB_TABLE}`;
  const [result] = await connection.query(query);
  return result;
}

export async function fetchOneEmployee(id: string) {
  const query = `SELECT * FROM ${DB_TABLE} WHERE id = ?`;
  const [result] = await connection.query<RowDataPacket[]>(query, id);
  return result[0];
}

export async function createEmployee(data: Employees) {
  const query = `INSERT INTO ${DB_TABLE} (prefix, first_name, mid_initial, last_name, suffix, job_title) VALUES (?,?,?,?,?,?)`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    query,
    Object.values(data)
  );
  const id = result.insertId.toString();
  return fetchOneEmployee(id);
}

export async function updateEmployee(data: Employees) {
  const id = data.id?.toString();
  const query = `UPDATE ${DB_TABLE} SET prefix = ?, first_name = ?, mid_initial = ?, last_name = ?, suffix = ?, job_title = ? WHERE id = ?`;
  await connection.query(query, Object.values(data));
  return fetchOneEmployee(id as string);
}

export async function deleteEmployee(id: string) {
  const query = `DELETE FROM ${DB_TABLE} WHERE id = ?`;
  const result = await connection.query(query, id);
  return result;
}
