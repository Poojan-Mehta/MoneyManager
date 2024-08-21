import express, { Request, Response } from "express";
import connectDb from "./config/dbConfig";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { routes } from './routes'


dotenv.config()

const app = express()
const port = process.env.PORT

// Register all routes
routes(app);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb()
app.use(express.json())



app.get('', (req:Request, res:Response) => {
    res.send(`This is home page`)
})

app.listen(port, () => {
    console.log(`Your application is running on port: ${port}`)
})

export default app