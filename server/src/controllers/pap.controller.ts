import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";
import { MfoPap } from "../types/mfoPap.types";

const TBL_MFO_PAP = "mfo_paps";

export async function fetchPaps() {
  const query = `SELECT * FROM ${TBL_MFO_PAP}`;
  const [result] = await connection.query(query);
  return result;
}

export async function fetchOnePap(id: string) {
  const query = `SELECT * FROM ${TBL_MFO_PAP} WHERE id = ?`;
  const [result] = await connection.query<RowDataPacket[]>(query, id);
  return result[0];
}

export async function createPap(data: MfoPap) {
  const query = `INSERT INTO ${TBL_MFO_PAP} (name, description, code) VALUES (?,?,?)`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    query,
    Object.values(data)
  );
  const id = result.insertId.toString();
  return fetchOnePap(id);
}

export async function updatePap(data: MfoPap) {
  const id = data.id?.toString();
  const query = `UPDATE ${TBL_MFO_PAP} SET name = ?, description = ?, code = ? WHERE id = ?`;
  const [result] = await connection.query(query, Object.values(data));
  return fetchOnePap(id as string);
}

export async function deletePap(id: string) {
  const query = `DELETE FROM ${TBL_MFO_PAP} WHERE id = ?`;
  const result = await connection.query(query, id);
  return result;
}
