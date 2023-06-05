import { BadRequestException, Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/createUser.dto";
import { promises } from "dns";
// import { Repository } from "typeorm";
// import { response } from "express";

@Injectable()
export class UserService {

    // constructor(@InjectRepository(User) private blogRepository: Repository<User>) { }

    // ??TODO: Repository
    async userRegisteration(userRegister: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = userRegister.name;
        user.email = userRegister.email;
        user.password = userRegister.password;
        try {
            //??name convention
            const res = await user.save()

            return res

        } catch (error) {

            throw new BadRequestException(
                'Something bad happened',
                {
                    cause: new Error(),
                    description: `${error.message}`
                })
        }
        // return this.blogRepository.save(userRegister)
    }

    async getUserByEmail(email: string): Promise<User> {

        const user = await User.findOne({ where: { email } })
        // console.log(user)
        return user
    }

    async getUserById(id: number): Promise<User> {
        return await User.findOne({ where: { id } })
    }
}
