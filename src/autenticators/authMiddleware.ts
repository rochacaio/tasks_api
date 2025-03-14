import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { invalidRequest } from "../helpers/httpHelper";
import { AutenticatorRequest } from "../protocols";
import { InvalidRequestError } from "../errors/invalid-request-error";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const autenticatorRequest = req as AutenticatorRequest;
    const token = autenticatorRequest.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return invalidRequest(new InvalidRequestError());
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        return next();
    } catch (error) {
        return invalidRequest(new InvalidRequestError());
    }
};
