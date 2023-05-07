import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { prototype } from 'events';
import { NextFunction } from 'express';
// import { JwtService } from '@nestjs/jwt';
import * as JWT from 'jsonwebtoken';


export class ApiTokenCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const my_token = req.headers['authorization'].split(' ')[1]
        // console.log("req: ", my_token)
        if (!my_token) throw new UnauthorizedException();
        const payload = JWT.verify(my_token, "$MySecret")
        req['user'] = payload
        next();
    }
}