import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "../services/auth.service";
import { User } from "src/modules/user/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<User> {
        try {

            // console.log("local startegy: ", email, password)

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