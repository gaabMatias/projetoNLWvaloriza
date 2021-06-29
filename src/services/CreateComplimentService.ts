import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from "../repositories/complimentsRepositories"
import { UserRepositories } from '../repositories/userRepository';

interface IComplimentCreate {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}
class CreateComplimentService {

    async execute({tag_id, user_sender, user_receiver, message}: IComplimentCreate){

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories) 
        const userRepositories = getCustomRepository(UserRepositories)

        if(user_sender === user_receiver){
            throw new Error("You cannot compliment yourself")
        }

        const userReceiverValid = userRepositories.findOne(user_receiver)

        if(!userReceiverValid){
            throw new Error("Invalid Receiver")
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })
        await complimentsRepositories.save(compliment)
        return compliment
    }
}

export { CreateComplimentService }