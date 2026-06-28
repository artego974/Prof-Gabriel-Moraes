import "reflect-metadata"
import express from "express"
import cors from "cors"
import { AppDataSource } from "./config/data-source"
import { seedAdmin } from "./config/seed"
import routes from "./routes"

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use("/api", routes)

AppDataSource.initialize().then(async ()=>{
    console.log("banco conectado")
    await seedAdmin()
    app.listen(port, ()=>{
        console.log("Server rodando na porta ", port)
    })
}).catch((err)=>{
    console.error("Erro ao conectar no banco", err)
})
