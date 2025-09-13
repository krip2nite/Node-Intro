import { NextFunction, Request,Response } from "express";
import _ from "lodash";
export function validation(req: Request & {error: Error}, res: Response, next: NextFunction) {
    let obj: any = req.body;
    if(!obj|| _.isEmpty(obj)) {
      obj = !req.params || _.isEmpty(req.params) ? req.query : req.params;
    }
        dataValidation(obj);
        obj.op1 = +obj.op1;
        obj.op2 = +obj.op2;
        req.body = obj;
    next();
}
function dataValidation(parsedData: any): void {
   if (!parsedData.operation || typeof parsedData.operation != "string") {
      throw new Error("field operation of 'string' type must exist")
   }
   if (isNaN(Number(parsedData.op1))) {
      throw new Error("field op1 of 'number' type must exist")
   }
   if (isNaN(Number(parsedData.op2))) {
      throw new Error("field op2 of 'number' type must exist")
   }
}