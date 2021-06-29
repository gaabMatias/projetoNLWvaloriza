import { getCustomRepository } from 'typeorm';
import { 
    Request,
    Response,
    NextFunction
} from 'express';
import { UserRepositories } from '../repositories/userRepository';


export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {

const { user_id } = request

const userRepositories = getCustomRepository(UserRepositories)

const { admin } = await userRepositories.findOne(user_id)
    // apply Jwt to verify if user is admin


    if (admin) {
        return next()
    }
    return response.status(401).json({ error: "User is not authorized"})
}