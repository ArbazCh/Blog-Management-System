import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/services/user.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from "./jwt.config";

@Module({
    imports: [UserModule, JwtModule.registerAsync(jwtConfig)],
    providers: [AuthService, UserService],
    controllers: [AuthController]
})
export class AuthModule { }