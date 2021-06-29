import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/complimentsRepositories';

class ListUserReceivedComplimentService {

    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
            relations : [
            "userSender",
            "userReceived",
            "tag"]
        })

        return compliments
    }
}


export { ListUserReceivedComplimentService }