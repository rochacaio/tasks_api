import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (): string => {
    return jwt.sign(
        { message: "Token gerado com sucesso!" },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
};

