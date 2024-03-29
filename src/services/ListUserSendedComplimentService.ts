import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/complimentsRepositories';




class ListUserSendedComplimentService {

    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepositories.find({
            where: {
                user_sender: user_id
            },
            relations : [
            "userSender",
            "userReceived",
            "tag"]
        })

        return compliments
    }
}


export { ListUserSendedComplimentService }