import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/tagsRepositories"

class CreateTagService {

    async execute(name: string) {

        const tagsRepositories = getCustomRepository(TagsRepositories) 

        if (!name) {
            throw new Error("Please Inform a Tag Name")
        }

        const tagAlreadyExists = await tagsRepositories.findOne({name})
        
        if (tagAlreadyExists) {
            throw new Error("This Tag already exists")
        }
        const tag = tagsRepositories.create({name})

        await tagsRepositories.save(tag)

        return tag
    }

}

export { CreateTagService }