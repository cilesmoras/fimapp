import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";

const TBL_OBLIGATION_ACC = "obligation_accounts";

export const fetchByObligationRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { obligation_request_id } = req.params;
  console.log(obligation_request_id);
  const query = `SELECT * FROM ${TBL_OBLIGATION_ACC} WHERE obligation_request_id = ?`;
  connection.query<RowDataPacket[]>(
    query,
    [obligation_request_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return next();
      }

      return res.send(result);
    }
  );
};
