import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/services/user.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from "./config/jwt.config";
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [UserModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
    providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
    controllers: [AuthController]
})
export class AuthModule { }