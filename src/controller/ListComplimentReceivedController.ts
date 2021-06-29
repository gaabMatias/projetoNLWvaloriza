import { Request, Response } from "express"
import { ListUserReceivedComplimentService } from "../services/ListUserReceivedComplimentService"

class ListComplimentsReceivedController{

    async handle(request: Request, response: Response){
        const { user_id } = request;

        const listComplimentsReceivedService = new ListUserReceivedComplimentService()

        const compliments = await listComplimentsReceivedService.execute(user_id)

        return response.json(compliments)
    }
}

export { ListComplimentsReceivedController }