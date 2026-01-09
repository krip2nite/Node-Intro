import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import z from 'zod';

const CalculationDataSchema = z.object({
   operation: z.string(),
   op1: z.coerce.number(),
   op2: z.coerce.number()
})

export function validation(req: Request, res: Response, next: NextFunction) {
   let obj: any = req.body;
   if (!obj || _.isEmpty(obj)) {
      obj = !req.params || _.isEmpty(req.params) ? req.query : req.params;
   }
   if (!_.isEmpty(obj)) {
      req.body = CalculationDataSchema.parse(obj)
   }

   next();
}
