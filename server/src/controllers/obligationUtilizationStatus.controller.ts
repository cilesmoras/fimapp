import { NextFunction, Request, Response } from "express";
import { PoolConnection } from "mysql2/promise";
import connection from "../mysqlConnection";
import { UtilizationStatus } from "../types/utilizationStatus.types";

const TBL_UTILIZATION_STATUS = "obligation_utilization_status";

export async function fetchByObligationRequestId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { obligation_request_id } = req.params;
    const query = `SELECT * FROM ${TBL_UTILIZATION_STATUS} WHERE obligation_request_id = ?`;
    const [result] = await connection.query(query, [obligation_request_id]);
    return res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
  // connection.query<RowDataPacket[]>(
  //   query,
  //   [obligation_request_id],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return next();
  //     }

  //     return res.send(result);
  //   }
  // );
}

export async function createUtilizationStatus(
  utilizationStatus: UtilizationStatus,
  pool: PoolConnection,
  obligationRequestId: number
) {
  const { date, particulars, ref_no, utilization_amount, payable, payment } =
    utilizationStatus;
  const query = `INSERT INTO ${TBL_UTILIZATION_STATUS} (obligation_request_id, date, particulars, ref_no, utilization_amount, payable, payment) VALUES (?,?,?,?,?,?,?)`;
  await pool.query(query, [
    obligationRequestId,
    date,
    particulars,
    ref_no,
    utilization_amount,
    payable,
    payment,
  ]);
}
