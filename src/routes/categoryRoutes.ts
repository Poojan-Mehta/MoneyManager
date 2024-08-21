import { Router } from 'express'
import { getAllCategories, addCategory } from '../controllers/category'

const router = Router()

router.get('', getAllCategories)
router.post('', addCategory)

export default router

