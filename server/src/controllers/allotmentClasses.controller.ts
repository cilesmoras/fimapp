import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";
import { AllotmentClasses } from "../types/allotmentClasses.types";

const TBL_ALLOTMENT_CLASS = "allotment_classes";
const TBL_LABEL = "Allotment class";

export async function fetchAllotmentClasses() {
  const query = `SELECT * FROM ${TBL_ALLOTMENT_CLASS}`;
  const [result] = await connection.query(query);
  return result;
}

export async function fetchOneAllotmentClass(id: string) {
  const query = `SELECT * FROM ${TBL_ALLOTMENT_CLASS} WHERE id = ?`;
  const [result] = await connection.query<RowDataPacket[]>(query, id);
  return result[0];
}

export async function createAllotmentClass(data: AllotmentClasses) {
  const query = `INSERT INTO ${TBL_ALLOTMENT_CLASS} (acronym, name) VALUES (?,?)`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    query,
    [...Object.values(data)]
  );
  const id = result.insertId.toString();
  return fetchOneAllotmentClass(id);
}

export async function updateAllotmentClass(data: AllotmentClasses) {
  const id = data.id?.toString();
  const query = `UPDATE ${TBL_ALLOTMENT_CLASS} SET acronym = ?, name = ? WHERE id = ?`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    query,
    [...Object.values(data)]
  );
  return fetchOneAllotmentClass(id as string);
}

export async function deleteAllotmentClass(id: string) {
  const query = `DELETE FROM ${TBL_ALLOTMENT_CLASS} WHERE id = ?`;
  const [result] = await connection.query(query, id);
  return result;
}
