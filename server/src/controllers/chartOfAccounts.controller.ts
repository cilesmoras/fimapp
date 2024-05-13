import { NextFunction, Request, Response } from "express";
import humps from "humps";
import { RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";

const DB_TABLE = "chart_of_accounts";
const TABLE_LABEL = "Account";

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

export const fetchByAllotmentClassesId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { allotmentClassesId } = req.params;

    const query = `SELECT * FROM ${DB_TABLE} WHERE allotment_classes_id = ?`;
    connection.query(query, [allotmentClassesId], (err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      return res.send(result);
    });
  } catch (error) {
    console.log("catch error", error);
  }
};

export const fetchOne = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const query = `SELECT * FROM ${DB_TABLE} WHERE id = ?`;
  connection.query<RowDataPacket[]>(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return next();
    }

    return res.send(humps.camelizeKeys(result[0]));
  });
};

export const insert = (req: Request, res: Response, next: NextFunction) => {
  const { allotmentClassesId, code, name } = req.body;
  const query = `INSERT INTO ${DB_TABLE} (allotment_classes_id, code, name) VALUES (?,?,?)`;
  connection.query(query, [allotmentClassesId, code, name], (err) => {
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
  const { allotmentClassesId, code, name } = req.body;
  const query = `UPDATE ${DB_TABLE} SET allotment_classes_id = ?, code = ?, name = ? WHERE id = ?`;
  connection.query(query, [allotmentClassesId, code, name, id], (err) => {
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
