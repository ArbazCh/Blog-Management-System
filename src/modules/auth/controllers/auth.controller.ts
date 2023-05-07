import { Controller, Post, Request, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
// import { LoginDto } from "../dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async userLogin(@Request() req) {
        // console.log("Request: ", req.body, req.user)
        return this.authService.generateToken(req.user)
    }


    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request() req) {
        return req.user
    }
} 