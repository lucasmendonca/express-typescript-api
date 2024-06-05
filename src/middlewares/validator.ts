import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationError } from "joi";

export function schemaValidator(schema: ObjectSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validateAsync(req.body);
      next();

    } catch (err: any) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          success: false,
          message: err.message,
          data: null,
        });
      }

      res.status(500).json({
        success: false,
        message: err?.message,
        data: null,
      });
    }
  };
}
