import { Request, Response } from "express"
import { UserService } from "../services/user_service/user_service"

export class UserController {
    userService: UserService

    constructor(value: UserService) {
        this.userService = value
    }

    async createUser(req: Request, res: Response) { }
    async getUser(req: Request, res: Response) {
        const userId = req.body.userId

        if (userId) {
            const result = await this.userService.getUser(userId)
            return res.json(result)
        }

        return res.json({ message: 'Id Não informado' })
    }

}