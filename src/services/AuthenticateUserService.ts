import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken"
import { UserRepositories } from '../repositories/userRepository';
import { configKeys } from '../config/configKeys'
interface IAuthenticateRequest{

    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest){ 
        // check if email exists
        const userRepository = getCustomRepository(UserRepositories)

        const user = await userRepository.findOne({email})
        
        if (!user){
            throw new Error("Email or Password Incorrect")
        }
        // verify if password is correct
        const matchPassword = await compare(password, user.password)

        if(!matchPassword){
            throw new Error("Email or Password Incorrect")
        }
        
        const token = sign({
            email: user.email},
            configKeys.tokenConfig.keyValidation,{
                expiresIn: "1d" ,
                subject: user.id
            }
            
            
            )
            return token 

    }

}

export { AuthenticateUserService }