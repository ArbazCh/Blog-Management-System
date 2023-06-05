import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from "src/modules/user/entities/user.entity";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUserCred(email: string, password: string): Promise<User> {

        try {
            const user: User = await this.userService.getUserByEmail(email)
            if (!user) throw new BadRequestException();
            const isPasswordValid: boolean = (await bcrypt.compare(password, user.password))

            if (!isPasswordValid)
                throw new UnauthorizedException();
            return user

        } catch (error) {
            console.log("auth service: ", error)
        }

    }

    generateToken(user: any): { access_token: string } {

        return {
            access_token: this.jwtService.sign({
                name: user.name,
                sub: user.id,
                email: user.email
            }),
        };
    }
}