import { PoolConnection } from "mysql2/promise";
import connection from "../mysqlConnection";
import { ObligationAccounts } from "../types/obligationAccounts.types";

const TBL_OBLIGATION_ACC = "obligation_accounts";

export async function fetchByObligationRequestId(id: string) {
  const query = `SELECT * FROM ${TBL_OBLIGATION_ACC} WHERE obligation_request_id = ?`;
  const [result] = await connection.query(query, id);
  return result;
}

export async function createObligationAccounts(
  obligationAccount: ObligationAccounts,
  pool: PoolConnection,
  obligationRequestId: number
) {
  const { mfo_paps_id, chart_of_accounts_id, responsibility_center, amount } =
    obligationAccount;
  const query = `INSERT INTO ${TBL_OBLIGATION_ACC} (obligation_request_id, mfo_paps_id, chart_of_accounts_id, responsibility_center, amount) VALUES (?,?,?,?,?)`;
  const [result] = await pool.query(query, [
    obligationRequestId,
    mfo_paps_id,
    chart_of_accounts_id,
    responsibility_center,
    amount,
  ]);

  return result;
}

export async function deleteObligationAccountsByObligationRequestId(
  id: number
) {
  const query = `DELETE FROM ${TBL_OBLIGATION_ACC} WHERE obligation_request_id = ?`;
  const [result] = await connection.query(query, id);
  return result;
}
