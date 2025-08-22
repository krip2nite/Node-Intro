import express, {Response, Request} from 'express';
import CalculationData from '../model/CalculationData.ts';
import calculator, { WrongOperationError } from '../service/calculator.ts'
import { validation } from '../middleware/validation.ts';

const app = express();
const port = 3500;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.json());
app.use(validation)
app.post("/api/calculator", (req: Request & {error: Error}, res: Response) => {
    try {
        if(!req.body){
            throw req.error
        }
        const result = calculator.calculate(req.body as CalculationData)
        sendResponse(res, 200, result);
    } catch (error) {
        const status = error instanceof WrongOperationError ? 404 : 400;
        sendResponse(res, status, error.message)
    }    
})
app.get("/api/calculator/:operation/:op1/:op2", validation, (req: Request & {error: Error}, res: Response)=> {
    try {
        if(!req.body){
            throw req.error
        }
        const result = calculator.calculate(req.params as any)
        sendResponse(res, 200, result);
    } catch (error) {
        const status = error instanceof WrongOperationError ? 404 : 400;
        sendResponse(res, status, error.message)
    } 
})

function sendResponse(res: Response, status: number, result: number | string){
    res.statusCode = status;
    res.send(result);
}
