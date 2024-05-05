import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

export function validateFormInput(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        console.error({
          error: "Invalid data",
          details: errorMessages,
        });
        return res.status(400).send({
          error: "Invalid data",
          details: errorMessages,
        });
      }

      next(err);
    }
  };
}
