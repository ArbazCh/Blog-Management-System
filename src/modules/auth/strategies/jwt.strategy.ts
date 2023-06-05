import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKey: "$MySecret"  //.env
        })
    }

    validate(payload: any): { id: number, name: string, email: string } {

        try {

            return {

                id: payload.sub,

                name: payload.name,

                email: payload.email

            }

        } catch (error) {

            throw new UnauthorizedException('Invalid token', error);
        }

    }
}