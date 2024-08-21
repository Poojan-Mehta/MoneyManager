import { Router } from 'express'
import { getAllTransactions, addTransaction, deleteAllTransaction } from '../controllers/transaction'
import { authenticate } from '../middlewares/authMiddleware' 

const router = Router()

router.get('', authenticate, getAllTransactions)
router.post('', authenticate, addTransaction),
router.delete('', authenticate, deleteAllTransaction)

export default router

