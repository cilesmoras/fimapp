import { NextFunction, Request, Response } from "express";
import { PoolConnection } from "mysql2/promise";
import connection from "../mysqlConnection";
import { ObligationAccounts } from "../types/obligationAccounts.types";

const TBL_OBLIGATION_ACC = "obligation_accounts";

export async function createObligationAccounts(
  obligationAccount: ObligationAccounts,
  pool: PoolConnection,
  obligationRequestId: number
) {
  const { mfo_paps_id, chart_of_accounts_id, responsibility_center, amount } =
    obligationAccount;
  const query = `INSERT INTO ${TBL_OBLIGATION_ACC} (obligation_request_id, mfo_paps_id, chart_of_accounts_id, responsibility_center, amount) VALUES (?,?,?,?,?)`;
  await pool.query(query, [
    obligationRequestId,
    mfo_paps_id,
    chart_of_accounts_id,
    responsibility_center,
    amount,
  ]);
}

export async function fetchByObligationRequestId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { obligation_request_id } = req.params;
    const query = `SELECT * FROM ${TBL_OBLIGATION_ACC} WHERE obligation_request_id = ?`;
    const [result] = await connection.query(query, [obligation_request_id]);
    return res.send(result);
  } catch (error) {
    next(error);
  }
}
