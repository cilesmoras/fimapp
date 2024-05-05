import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";

const TBL_OBLIGATION = "obligation_request";
const VIEW_OBLIGATION = "view_obligation_request";
const TBL_LABEL = "Obligation request";

export const index = (req: Request, res: Response, next: NextFunction) => {
  const query = `SELECT * FROM ${TBL_OBLIGATION}`;
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
  const query = `SELECT * FROM ${TBL_OBLIGATION} WHERE id = ?`;
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
  const query = `INSERT INTO ${TBL_OBLIGATION} (serial_no, fund_cluster, payee, payee_office, payee_office_address, particulars, date) VALUES (?,?,?,?,?,?,?)`;
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
  const query = `UPDATE ${TBL_OBLIGATION} SET serial_no = ?, fund_cluster = ?, payee = ?, payee_office = ?, payee_office_address = ?, particulars = ?, date = ? WHERE id = ?`;
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
  const query = `DELETE FROM ${TBL_OBLIGATION} WHERE id = ?`;
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
