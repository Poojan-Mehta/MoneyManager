import { Router } from "express";
import { createUser, getUsers, getUserById, getDateWiseExpensesForUser } from "../controllers/user";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router()

router.get('/', authenticate,getUsers)
router.post('/', createUser)
router.get('/:id', authenticate, getUserById)
router.get('/dateWiseExpense/:userId/:date', authenticate, getDateWiseExpensesForUser)

export default router
