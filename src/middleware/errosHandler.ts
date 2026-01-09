import { Request,Response,NextFunction } from "express";
import { WrongOperationError } from "../service/calculator.ts";
import { ZodError } from "zod";

const errorHandler = (error: Error, _: Request, res: Response, __: NextFunction)=>{
    const status = error instanceof WrongOperationError ? 404 : 400;
    res.statusCode = status;
    const message = error instanceof ZodError ? getZodMessage(error) : error.message;
    res.end(message);
}
export default errorHandler;

function getZodMessage(error: ZodError): string{
    return error.issues.reduce((res: string, iss) => res + `${res ? '; \n' : ''}${String(iss.path[0])}: ${iss.message}`, "")
}