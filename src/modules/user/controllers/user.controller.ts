// Users must be able to create an account with a unique username and password.
// Users must be able to log in with their username and password.
// Users must be able to log out of the application.
// Users must be able to reset their password in case they forget it.

import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/createUser.dto";

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/register')

    async userRegisteration(@Body() userRegister: CreateUserDto) {
        return await this.userService.userRegisteration(userRegister)
    }
}