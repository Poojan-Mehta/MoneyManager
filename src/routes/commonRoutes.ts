import { Router } from "express";
import { Request, Response } from "express";

const router = Router()

router.get('', (req:Request, res:Response) => {
    res.send( `This is home page`)
})

router.get('/about', (req:Request, res:Response) => {
    res.send( `This is about page`)
})


export default router