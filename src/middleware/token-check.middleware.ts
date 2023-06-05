import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';

export class ApiTokenCheckMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction): void {

        // console.log(" headers middleware: ", req.headers)

        const my_token = req.headers['authorization']?.split(' ')[1]

        if (!my_token) throw new UnauthorizedException();

        const payload = JWT.verify(my_token, "$MySecret")

        req['user'] = payload

        next();
    }
}