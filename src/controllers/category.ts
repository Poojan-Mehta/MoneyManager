import { Request, Response, NextFunction } from "express";
import Category from '../models/category'

export const getAllCategories = async (req: Request, res: Response) => {
    try{
        const categories = await Category.find()
        res.status(200).json({
            valid: true,
            data: categories
        })
    } catch(error){
        res.status(400).json({
            valid: false,
            message: 'Something went wrong'
        })
    }
}

export const addCategory = async (req: Request, res: Response) => {
    try{
        const { name } = req.body;
        const category = new Category({ name })
        await category.save();
        res.status(200).json({
            valid: true,
            data: category,
            message: "Category created successfully"
        })
    } catch(error){
        res.status(400).json({
            valid: false,
            //messaage: error,
            message: 'Something went wrong'
        })
    }
}