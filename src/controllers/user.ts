import { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Transaction from '../models/transaction'

const JWT_TOKEN = process.env.JWT_SECRET || 'MoneyManager';

//create user
export const createUser = async (req:Request, res:Response) => {
    try{
        const { name, email, password, contact, role} = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashPassword, contact, role})
        await user.save();
        res.status(200).json({
            valid: true,
            data: user,
            message: "User created successfully"
        })
    } catch(error){
        res.status(400).json({
            valid: false,
            //messaage: error,
            message: 'Something went wrong'
        })
    }
}

export const getUsers = async(req: Request, res: Response) => {
    try{
        const users = await User.find().select('-password')
        res.status(200).json({
            valid: true,
            data: users
        })
    } catch(error){
        res.status(400).json({
            valid: false,
            message: 'Something went wrong'
        })
    }
}

export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                valid: false,
                message: "Email not exists"
            })
        }else{
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({
                    valid: false,
                    message: "Password is wrong.."
                })
            }

            //create a token and store in user collection
            const token = jwt.sign({user_id: user._id}, JWT_TOKEN, { expiresIn: '1h'})

             // Store token in user document
            user.accessToken = token;
            await user.save();

            return res.status(200).json({
                success: true,
                token,
                message: 'Login successful',
            });
        }
        
    } catch(error: unknown){
        let errorMessage = 'Error logging in';

        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return res.status(500).json({
            success: false,
            error: errorMessage,
            message: 'Error logging in',
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params; // Get user ID from request parameters

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required'
        });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error: unknown) {
        let errorMessage = 'Error retrieving user';

        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return res.status(500).json({
            success: false,
            error: errorMessage,
            message: 'Error retrieving user',
        });
    }
};

export const getDateWiseExpensesForUser = async (req: Request, res: Response) => {
    const { userId, date } = req.params;

    // Validate the inputs
    if (!userId || !date) {
        return res.status(400).json({
            success: false,
            message: 'User ID and date are required'
        });
    }

    // Convert date to ISO format for querying
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setDate(endOfDay.getDate() + 1);  // Set endOfDay to the next day

    try {
        const expenses = await Transaction.find({
            user_id: userId,
            type: 2,  // Assuming 2 indicates expenses
            transaction_date: { $gte: startOfDay, $lt: endOfDay }
        })
        .populate('user_id', 'name')
        .populate('category_id', 'name');

        return res.status(200).json({
            success: true,
            data: expenses
        });
    } catch (error: unknown) {
        let errorMessage = 'Error retrieving expenses';

        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return res.status(500).json({
            success: false,
            error: errorMessage,
            message: 'Error retrieving expenses',
        });
    }
};