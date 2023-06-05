import { Controller, Post, Request, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { User } from "src/modules/user/entities/user.entity";
// import { LoginDto } from "../dto/login.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)

    @Post('login')

    userLogin(@Request() req): { access_token: string } {

        return this.authService.generateToken(req.user)
    }

    @UseGuards(JwtAuthGuard)

    @Get('user')

    user(@Request() req): User {

        return req.user
    }
} 