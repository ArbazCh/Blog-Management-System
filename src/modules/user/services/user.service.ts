import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/createUser.dto";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    // constructor(@InjectRepository(User) private blogRepository: Repository<User>) { }


    async userRegisteration(userRegister: CreateUserDto) {
        const user = new User();
        user.name = userRegister.name;
        user.email = userRegister.email;
        user.password = userRegister.password;
        const res = await user.save()
        return res
        // return this.blogRepository.save(userRegister)

    }
}