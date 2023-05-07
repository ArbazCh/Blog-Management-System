import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string) {
        try {
            // console.log(username, password)
            const user = await this.authService.validateUserCred(email, password)
            if (!user) {
                throw new UnauthorizedException();
            }
            return user;

        } catch (error) {
            console.log("local strategy catch error: ", error)
        }
    }

}