import { NextFunction, Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";

const tblMfoPap = "mfo_paps";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = `SELECT * FROM ${tblMfoPap}`;
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
  const query = `SELECT * FROM ${tblMfoPap} WHERE id = ?`;
  connection.query<RowDataPacket[]>(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return next();
    }

    return res.send(result[0]);
  });
};

export const insert = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, code } = req.body;
  const query = `INSERT INTO ${tblMfoPap} (name, description, code) VALUES (?,?,?)`;
  connection.query(query, [name, description, code], (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res
      .status(201)
      .json({ success: true, message: "PAP successfully saved." });
  });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, description, code } = req.body;
  const query = `UPDATE ${tblMfoPap} SET name = ?, description = ?, code = ? WHERE id = ?`;
  connection.query(query, [name, description, code, id], (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res
      .status(200)
      .json({ success: true, message: "PAP successfully saved." });
  });
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const query = `DELETE FROM ${tblMfoPap} WHERE id = ?`;
  connection.query(query, id, (err) => {
    if (err) {
      console.log(err);
      return next();
    }
    return res
      .status(200)
      .json({ success: true, message: "PAP has been deleted." });
  });
};
