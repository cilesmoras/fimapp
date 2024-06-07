import { PoolConnection } from "mysql2/promise";
import connection from "../mysqlConnection";
import { UtilizationStatus } from "../types/utilizationStatus.types";

const TBL_UTILIZATION_STATUS = "obligation_utilization_status";

export async function fetchUtilizationStatusByObligationRequestId(id: string) {
  const query = `SELECT * FROM ${TBL_UTILIZATION_STATUS} WHERE obligation_request_id = ?`;
  const [result] = await connection.query(query, id);
  return result;
}

export async function createUtilizationStatus(
  utilizationStatus: UtilizationStatus,
  pool: PoolConnection,
  obligationRequestId: number
) {
  const { date, particulars, ref_no, utilization_amount, payable, payment } =
    utilizationStatus;
  const query = `INSERT INTO ${TBL_UTILIZATION_STATUS} (obligation_request_id, date, particulars, ref_no, utilization_amount, payable, payment) VALUES (?,?,?,?,?,?,?)`;
  const [result] = await pool.query(query, [
    obligationRequestId,
    date,
    particulars,
    ref_no,
    utilization_amount,
    payable,
    payment,
  ]);

  return result;
}

export async function deleteUtilizationStatusByObligationRequestId(id: number) {
  const query = `DELETE FROM ${TBL_UTILIZATION_STATUS} WHERE obligation_request_id = ?`;
  const [result] = await connection.query(query, id);
  return result;
}
