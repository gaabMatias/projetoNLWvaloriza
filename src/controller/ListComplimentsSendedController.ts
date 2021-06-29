import { Request, Response } from "express"
import { ListUserSendedComplimentService } from "../services/ListUserSendedComplimentService"

class ListComplimentsSendedController{

    async handle(request: Request, response: Response){
        const { user_id } = request;

        const listComplimentsSendedService = new ListUserSendedComplimentService()

        const compliments = await listComplimentsSendedService.execute(user_id)

        return response.json(compliments)
    }
}

export { ListComplimentsSendedController }