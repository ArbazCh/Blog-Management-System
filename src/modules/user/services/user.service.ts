import { BadRequestException, Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/createUser.dto";
// import { Repository } from "typeorm";
// import { response } from "express";

@Injectable()
export class UserService {

    // constructor(@InjectRepository(User) private blogRepository: Repository<User>) { }

    async userRegisteration(userRegister: CreateUserDto) {
        const user = new User();
        user.name = userRegister.name;
        user.email = userRegister.email;
        user.password = userRegister.password;
        try {
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

    async getUserByEmail(email: string) {

        const user = await User.findOne({ where: { email: email } })
        // console.log(user)
        return user


    }

    async getUserById(id: number) {
        return await User.findOne({ where: { id } })
    }
}
