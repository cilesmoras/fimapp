import { NextFunction, Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";

const TBL_OBLIGATION_REQ = "obligation_request";
const VIEW_OBLIGATION_REQ = "view_obligation_requests";
const TBL_OBLIGATION_ACC = "obligation_accounts";
const TBL_UTILIZATION_STATUS = "obligation_utilization_status";
const TBL_LABEL = "Obligation request";

type ObligationAccounts = {
  id?: number;
  mfo_paps_id: number;
  chart_of_accounts_id: number;
  amount: number;
};

type UtilizationStatus = {
  obligation_request_id: number;
  date: Date;
  particulars: string;
  ref_no: string;
  utilization_amount: number;
  payable: number;
  payment: number;
};

export const index = (req: Request, res: Response, next: NextFunction) => {
  const query = `SELECT * FROM ${VIEW_OBLIGATION_REQ}`;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    return res.send(result);
  });
};

export const fetchOne = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const query = `SELECT * FROM ${TBL_OBLIGATION_REQ} WHERE id = ?`;
  connection.query<RowDataPacket[]>(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return next();
    }

    return res.send(result[0]);
  });
};
export const insert = (req: Request, res: Response, next: NextFunction) => {
  connection.getConnection((connectionError, poolConnection) => {
    if (connectionError) {
      console.log(connectionError);
      poolConnection.rollback(() => poolConnection.release);
      return next(connectionError);
    }

    poolConnection.beginTransaction((err) => {
      if (err) {
        console.log(err);
        poolConnection.rollback(() => poolConnection.release);
        return next(err);
      }

      const {
        serial_no,
        fund_cluster,
        payee,
        payee_office,
        payee_office_address,
        particulars,
        date,
        obligation_accounts,
        utilization_status,
      } = req.body;
      const obligationRequestQuery = `INSERT INTO ${TBL_OBLIGATION_REQ} (serial_no, fund_cluster, payee, payee_office, payee_office_address, particulars, date) VALUES (?,?,?,?,?,?,?)`;
      poolConnection.query(
        obligationRequestQuery,
        [
          serial_no,
          fund_cluster,
          payee,
          payee_office,
          payee_office_address,
          particulars,
          date,
        ],
        (err1, result1: ResultSetHeader) => {
          if (err1) {
            console.log(err1);
            next(err1);
            return poolConnection.rollback(() => poolConnection.release);
          }

          // getting the inserted id of obligation request table
          const obligationRequestLastInsertedId = result1.insertId;
          // inserting of obligation accounts
          const obligationAccountsQuery = `INSERT INTO ${TBL_OBLIGATION_ACC} (obligation_request_id, mfo_paps_id, chart_of_accounts_id, responsibility_center, amount) VALUES ?`;
          const obligationAccountsValues = obligation_accounts.map(
            (acc: ObligationAccounts) => [
              obligationRequestLastInsertedId,
              acc.mfo_paps_id,
              acc.chart_of_accounts_id,
              null,
              acc.amount,
            ]
          );
          poolConnection.query(
            obligationAccountsQuery,
            [obligationAccountsValues],
            (err2) => {
              if (err2) {
                console.log(err2);
                next(err2);
                return poolConnection.rollback(() => poolConnection.release);
              }
            }
          );

          // inserting of utilization status
          const utilizationStatusQuery = `INSERT INTO ${TBL_UTILIZATION_STATUS} (obligation_request_id, date, particulars, ref_no, utilization_amount, payable, payment) VALUES ?`;
          const utilizationStatusValues = utilization_status.map(
            (util: UtilizationStatus) => [
              obligationRequestLastInsertedId,
              util.date,
              util.particulars,
              util.ref_no,
              util.utilization_amount,
              util.payable,
              util.payment,
            ]
          );
          poolConnection.query(
            utilizationStatusQuery,
            [utilizationStatusValues],
            (err3) => {
              if (err3) {
                console.log(err3);
                next(err3);
                return poolConnection.rollback(() => poolConnection.release);
              }
            }
          );

          poolConnection.commit();
          return res.status(201).json({
            success: true,
            message: `${TBL_LABEL} successfully saved.`,
          });
        }
      );
    });
  });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const formValues = Object.values(req.body);
  const query = `UPDATE ${TBL_OBLIGATION_REQ} SET serial_no = ?, fund_cluster = ?, payee = ?, payee_office = ?, payee_office_address = ?, particulars = ?, date = ? WHERE id = ?`;
  connection.query(query, [...formValues, id], (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res
      .status(201)
      .json({ success: true, message: `${TBL_LABEL} successfully saved.` });
  });
};
export const remove = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const query = `DELETE FROM ${TBL_OBLIGATION_REQ} WHERE id = ?`;
  connection.query(query, id, (err) => {
    if (err) {
      console.log(err);
      return next();
    }
    return res
      .status(200)
      .json({ success: true, message: `${TBL_LABEL} has been deleted.` });
  });
};
