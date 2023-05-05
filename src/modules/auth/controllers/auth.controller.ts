import { Controller, Post, Request } from "@nestjs/common";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    async userLogin(@Request() req) {
        // console.log("req: ", req.body)
        const { email, password } = req.body
        return this.authService.validateUserCred(email, password)
    }
} 