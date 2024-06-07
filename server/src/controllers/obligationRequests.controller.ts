import {
  FieldPacket,
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import connection from "../mysqlConnection";
import { ObligationRequest } from "../types/obligationRequests.types";

const TBL_OBLIGATION_REQ = "obligation_request";
const VIEW_OBLIGATION_REQ = "view_obligation_requests";
const TBL_OBLIGATION_ACC = "obligation_accounts";
const TBL_UTILIZATION_STATUS = "obligation_utilization_status";
const TBL_LABEL = "Obligation request";

export async function fetchObligationRequests() {
  const query = `SELECT * FROM ${VIEW_OBLIGATION_REQ}`;
  const [result] = await connection.query(query);
  return result;
}

export async function fetchOneObligationRequest(id: string) {
  const query = `SELECT * FROM ${TBL_OBLIGATION_REQ} WHERE id = ?`;
  const [result] = await connection.query<RowDataPacket[]>(query, id);
  return result[0];
}

export async function createObligationRequest(
  data: ObligationRequest,
  pool: PoolConnection
) {
  const query = `INSERT INTO ${TBL_OBLIGATION_REQ} (serial_no, fund_cluster, payee, payee_office, payee_office_address, particulars, date) VALUES (?,?,?,?,?,?,?)`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
    query,
    Object.values(data)
  );
  return result;
}

export async function updateObligationRequest(
  data: ObligationRequest,
  pool: PoolConnection
) {
  const query = `UPDATE ${TBL_OBLIGATION_REQ} SET serial_no = ?, fund_cluster = ?, payee = ?, payee_office = ?, payee_office_address = ?, particulars = ?, date = ? WHERE id = ?`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
    query,
    Object.values(data)
  );
  return result;
}

export async function deleteObligationRequest(id: number) {
  const query = `DELETE FROM ${TBL_OBLIGATION_REQ} WHERE id = ?`;
  const [result] = await connection.query(query, id);
  return result;
}
