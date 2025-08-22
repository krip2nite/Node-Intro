import {Request, Response, NextFunction} from 'express'
export function requestTime(req: Request & {requestedAt?: string}, __: Response, next: NextFunction): void {
   req.requestedAt = new Date().toLocaleTimeString();
   next();
}