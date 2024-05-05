import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";

const TBL_ALLOTMENT_CLASS = "allotment_classes";
const TBL_LABEL = "Allotment class";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = `SELECT * FROM ${TBL_ALLOTMENT_CLASS}`;
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
  const query = `SELECT * FROM ${TBL_ALLOTMENT_CLASS} WHERE id = ?`;
  connection.query<RowDataPacket[]>(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return next();
    }

    return res.send(result[0]);
  });
};

export const insert = (req: Request, res: Response, next: NextFunction) => {
  const { acronym, name } = req.body;
  const query = `INSERT INTO ${TBL_ALLOTMENT_CLASS} (acronym, name) VALUES (?,?)`;
  connection.query(query, [acronym, name], (err) => {
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
  const { acronym, name } = req.body;
  const query = `UPDATE ${TBL_ALLOTMENT_CLASS} SET acronym = ?, name = ? WHERE id = ?`;
  connection.query(query, [acronym, name, id], (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res
      .status(200)
      .json({ success: true, message: `${TBL_LABEL} successfully saved.` });
  });
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const query = `DELETE FROM ${TBL_ALLOTMENT_CLASS} WHERE id = ?`;
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
