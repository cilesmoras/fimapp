import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";

const TBL_BUDGET = "approved_budget";
const VIEW_BUDGET = "view_budget";
const TBL_LABEL = "Budget";

export const index = (req: Request, res: Response, next: NextFunction) => {
  const query = `SELECT * FROM ${VIEW_BUDGET}`;
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
  const query = `SELECT * FROM ${VIEW_BUDGET} WHERE id = ?`;
  connection.query<RowDataPacket[]>(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return next();
    }

    return res.send(result[0]);
  });
};

export const insert = (req: Request, res: Response, next: NextFunction) => {
  const formValues = Object.values(req.body);
  const query = `INSERT INTO ${TBL_BUDGET} (mfo_paps_id, chart_of_accounts_id, amount) VALUES (?,?,?)`;
  connection.query(query, formValues, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res
      .status(201)
      .json({ success: true, message: `${TBL_LABEL} successfully saved.` });
  });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const formValues = Object.values(req.body);
  const query = `UPDATE ${TBL_BUDGET} SET mfo_paps_id = ?, chart_of_accounts_id = ?, amount = ? WHERE id = ?`;
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
  const query = `DELETE FROM ${TBL_BUDGET} WHERE id = ?`;
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
