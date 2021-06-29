import { Request, Response, NextFunction, response } from "express"
import { verify } from "jsonwebtoken"


interface IPayload {
    sub: string;
}

export function ensureAuthenticated (
    request: Request,
    response: Response,
    next: NextFunction
) {
    // Receive Token
    const authToken = request.headers.authorization
    // Check if Token is informed
    if(!authToken) {
        return response.status(401).end()
    }

    const [,token] = authToken.split(" ")

    try {
        const { sub } = verify(token, "33aebda8f4d31083623dc4d34e809863") as IPayload
        request.user_id = sub

    } catch (err) {
        return response.status(401).end()
    }
    // Check if Token is valid



    return next()
}
    