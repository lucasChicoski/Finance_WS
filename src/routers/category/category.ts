import { Request, Response, Router } from "express";




function routers(app: Router) {
    app.post('/get-categories', (req: Request, res: Response) => res.send('Método não implementado'))
}


export { routers as categoryRouters }