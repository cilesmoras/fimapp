import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";

const DB_TABLE = "employees";
const TABLE_LABEL = "Employee";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = `SELECT * FROM ${DB_TABLE}`;
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
  const query = `SELECT * FROM ${DB_TABLE} WHERE id = ?`;
  connection.query<RowDataPacket[]>(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return next();
    }

    return res.send(result[0]);
  });
};

export const insert = (req: Request, res: Response, next: NextFunction) => {
  const employeesFormValues = Object.values(req.body);
  const query = `INSERT INTO ${DB_TABLE} (prefix, first_name, mid_initial, last_name, suffix, job_title) VALUES (?,?,?,?,?,?)`;
  connection.query(query, employeesFormValues, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res
      .status(201)
      .json({ success: true, message: `${TABLE_LABEL} successfully saved.` });
  });
};
export const update = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const employeesFormValues = Object.values(req.body);
  const query = `UPDATE ${DB_TABLE} SET prefix = ?, first_name = ?, mid_initial = ?, last_name = ?, suffix = ?, job_title = ? WHERE id = ?`;
  connection.query(query, [...employeesFormValues, id], (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res
      .status(201)
      .json({ success: true, message: `${TABLE_LABEL} successfully saved.` });
  });
};
export const remove = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const query = `DELETE FROM ${DB_TABLE} WHERE id = ?`;
  connection.query(query, id, (err) => {
    if (err) {
      console.log(err);
      return next();
    }
    return res
      .status(200)
      .json({ success: true, message: `${TABLE_LABEL} has been deleted.` });
  });
};
