import express, { Request, Response, NextFunction } from 'express'
import { requestTime } from "../middleware/requestTime.ts";
import limiter from "../middleware/limit.ts"
const app = express()
const port = 3500;
app.listen(port, () => console.log("server is listening on port " + port));

app.use(requestTime)
app.post("/api/greet", (req: Request& {requestedAt: string}, res: Response) => {
   res.json({message: "Hello!", requestedAt: req.requestedAt});
})
   app.get("/api/status", limiter, (req: Request& {requestedAt: string}, res: Response) => {
   res.json({status: "Up and Running", requestedAt: req.requestedAt});
} )