import { Request, Response, Router } from "express";



function routers(app: Router) {
    app.get('/status', (req: Request, res: Response) =>  res.render('api-status'))
}


export { routers as status }