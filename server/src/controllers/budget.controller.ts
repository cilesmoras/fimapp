import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "../mysqlConnection";
import { Budget } from "../types/budget.types";

const TBL_BUDGET = "approved_budget";
const VIEW_BUDGET = "view_budget";
const TBL_LABEL = "Budget";

export async function fetchBudget() {
  const query = `SELECT * FROM ${VIEW_BUDGET}`;
  const [result] = await connection.query(query);
  return result;
}

export async function fetchOneBudget(id: string) {
  const query = `SELECT * FROM ${VIEW_BUDGET} WHERE id = ?`;
  const [result] = await connection.query<RowDataPacket[]>(query, [id]);
  return result[0];
}

export async function createBudget(data: Budget) {
  const query = `INSERT INTO ${TBL_BUDGET} (mfo_paps_id, chart_of_accounts_id, amount) VALUES (?,?,?)`;
  const [result]: [ResultSetHeader, FieldPacket[]] = await connection.query(
    query,
    Object.values(data)
  );
  const id = result.insertId.toString();
  return fetchOneBudget(id);
}

export async function updateBudget(data: Budget) {
  const id = data.id?.toString();
  const query = `UPDATE ${TBL_BUDGET} SET mfo_paps_id = ?, chart_of_accounts_id = ?, amount = ? WHERE id = ?`;
  await connection.query(query, Object.values(data));
  return fetchOneBudget(id as string);
}

export async function deleteBudget(id: string) {
  const query = `DELETE FROM ${TBL_BUDGET} WHERE id = ?`;
  const [result] = await connection.query(query, id);
  return result;
}
