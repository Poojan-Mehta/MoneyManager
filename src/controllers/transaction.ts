import { Request, Response, NextFunction } from "express";
import Transaction from '../models/transaction'

export const getAllTransactions = async (req: Request, res: Response) => {
    try{
        const transactions = await Transaction.find()
            .populate('category_id', 'name')  // Populate category_id field, only selecting the name field from Category
            .populate('user_id', 'name');

        res.status(200).json({
            valid: true,
            data: transactions
        })
    } catch(error){        
        res.status(400).json({
            valid: false,
            error: error,
            message: 'Something went wrong'
        })
    }
}

export const addTransaction = async (req: Request, res: Response) => {
    try{
        const { amount, type, notes, user_id, category_id, transaction_date } = req.body;
        const transaction = new Transaction({ amount, type, notes, user_id, category_id, transaction_date })
        await transaction.save();
        res.status(200).json({
            valid: true,
            data: transaction,
            message: "Transaction created successfully"
        })
    } catch(error){
        res.status(400).json({
            valid: false,
            error: error,
            message: 'Something went wrong'
        })
    }
}

export const deleteAllTransaction = async (req: Request, res: Response) => {
    
    try {
        const deleteTransactions = await Transaction.deleteMany({})
        
        res.status(200).json({
          success: true,
          message: 'All transactions have been deleted successfully',
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'An error occurred while deleting transactions',
          error: error,
        });
      }
}