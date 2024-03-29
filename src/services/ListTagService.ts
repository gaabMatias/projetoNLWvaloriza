import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/tagsRepositories';
import { classToPlain } from "class-transformer"


class ListTagService {
    async execute(){
        const tagsRepository = getCustomRepository(TagsRepositories)

        const tags = await tagsRepository.find()

        return classToPlain(tags)
    }
}


export { ListTagService }