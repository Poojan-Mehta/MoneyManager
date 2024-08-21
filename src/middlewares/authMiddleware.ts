import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

const JWT_SECRET = process.env.JWT_SECRET || 'MoneyManager'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    //get token 
    const token = req.header('Authorization')?.replace('Bearer', '').trim()
     
    if(!token){
        return res.status(401).json({
            valid: false,
            message: 'Access denied, Invalid credentials'
        })
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET) as { user_id: String }
        const user = await User.findById(decode.user_id)
        
        if(!user || token != user.accessToken){ 
            return res.status(401).json({
                valid: false,
                message: 'Access denied, Invalid credentialsddd'
            })
        }
        
        req.user = user
        
        next()
    } catch (error) {
        return res.status(401).json({
            valid: false,
            message: 'Access denied, Invalid credentialswwww'
        })
    }
    

}