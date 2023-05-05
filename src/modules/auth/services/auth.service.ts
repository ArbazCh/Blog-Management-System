import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/modules/user/services/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async validateUserCred(email, password) {
        const user = await this.userService.getUserByEmail(email)

        if (!user) throw new BadRequestException();

        if (!(await bcrypt.compare(password, user.password)))
            throw new UnauthorizedException();

        console.log("user: ", user)

        //Token Generate against user


        const access_token = this.jwtService.sign({
            name: user.name,
            sub: user.id,
        })
        // console.log(access_token)
        return access_token


    }
}