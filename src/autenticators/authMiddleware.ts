import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import 'dotenv/config';
import { AutenticatorRequest } from "../protocols";
import { InvalidRequestError } from "../errors/invalid-request-error";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const autenticatorRequest = req as AutenticatorRequest;
    const token = autenticatorRequest.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new InvalidRequestError("Token is missing!");
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (error) {
        throw new InvalidRequestError("Invalid or missing Token!");
    }
};
