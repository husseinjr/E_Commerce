import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class Middleware {
    checkValidationErrors(req:Request, res:Response, next:NextFunction){
        const error = validationResult(req);
        if(!error.isEmpty()) {
            res.json(error);
        }
        next();
    };
    
}

export default new Middleware();