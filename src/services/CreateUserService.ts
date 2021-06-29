import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import {UserRepositories} from "../repositories/userRepository"
import { hash } from "bcryptjs"
interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {


    async execute({name, email, admin, password}: IUserRequest) {
        const usersRepository = getCustomRepository(UserRepositories)

        if (!email) {
            throw new Error(`please inform a validity email`)
        }

        const alreadyExists = await usersRepository.findOne({
            email,
        })

        if (alreadyExists){
            throw new Error(`User already exists`)
            
        }

        const passwordHash = await hash(password, 10)


        const user = await usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        })

        await usersRepository.save(user)
        
        return user;

    }
}

export { CreateUserService } 