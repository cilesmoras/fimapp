import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";
import { ChartOfAccounts } from "../types/chartOfAccounts.types";

const DB_TABLE = "chart_of_accounts";
const TABLE_LABEL = "Account";

export async function fetchChartOfAccounts() {
  const query = `SELECT * FROM ${DB_TABLE}`;
  const [result] = await connection.query(query);
  return result;
}

export async function fetchChartOfAcccountsByAllotmentClassesId(
  allotmentClassesId: string
) {
  const query = `SELECT * FROM ${DB_TABLE} WHERE allotment_classes_id = ?`;
  const [result] = await connection.query(query, [allotmentClassesId]);
  return result;
}

export async function fetchOneChartOfAccount(id: string) {
  const query = `SELECT * FROM ${DB_TABLE} WHERE id = ?`;
  const [result] = await connection.query<RowDataPacket[]>(query, [id]);
  return result[0];
}

export async function createChartOfAccount(data: ChartOfAccounts) {
  const query = `INSERT INTO ${DB_TABLE} (allotment_classes_id, code, name) VALUES (?,?,?)`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    query,
    [...Object.values(data)]
  );
  const id = result.insertId.toString();
  return fetchOneChartOfAccount(id);
}

export async function updateChartOfAccount(data: ChartOfAccounts) {
  const id = data.id?.toString();
  const query = `UPDATE ${DB_TABLE} SET allotment_classes_id = ?, code = ?, name = ? WHERE id = ?`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    query,
    [...Object.values(data)]
  );
  return fetchOneChartOfAccount(id as string);
}

export async function deleteChartOfAccount(id: string) {
  const query = `DELETE FROM ${DB_TABLE} WHERE id = ?`;
  const [result] = await connection.query(query, id);
  return result;
}
