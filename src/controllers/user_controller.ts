import { Request, Response } from "express"
import { UserService } from "../services/user_service/user_service"
import { UserModel } from "../domain/models/user_model"

export class UserController {
    userService: UserService

    constructor(value: UserService) {
        this.userService = value
    }

    async createUser(req: Request, res: Response) {
        const body = req.body

        try {
            this.userService.createUser(new UserModel(body))
            const y = 0
            res.send('Usuario Criado com sucesso')
        } catch (error: unknown) {
            const err = error as Error
            res.json(err)
        }

    }
    async getUser(req: Request, res: Response) {
        const userId = req.body.userId

        if (userId) {
            const result = await this.userService.getUser(userId)
            return res.json(result)
        }

        return res.json({ message: 'Id Não informado' })
    }

}