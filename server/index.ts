import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import {
  allotmentClassesRoute,
  budgetRoute,
  chartOfAccountsRoute,
  employeesRoute,
  obligationAccountsRoute,
  obligationRequestsRoute,
  obligationUtilizationStatus,
  papRoute,
} from "./src/routes/index.route";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

const PORT = process.env.port || 5001;
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

app.get("/", (req, res, next) => {
  res.send("Helow solo.");
});

app.use("/employees", employeesRoute);
app.use("/budget", budgetRoute);
app.use("/mfo-pap", papRoute);
app.use("/allotment-classes", allotmentClassesRoute);
app.use("/chart-of-accounts", chartOfAccountsRoute);
app.use("/ors", obligationRequestsRoute);
app.use("/ors-accounts", obligationAccountsRoute);
app.use("/ors-utilization-status", obligationUtilizationStatus);

// Handling errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server error" });
});
