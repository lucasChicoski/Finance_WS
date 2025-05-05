import express from "express"
import dotenv from 'dotenv'
import indexRouters from "./routers"
import cors from "cors"
import path from 'path'



dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }))

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

indexRouters(app)

const port = process.env.PORT ?? 3001

app.listen(port, () => {
    console.log('Aplicação rodando na porta:', port)
})