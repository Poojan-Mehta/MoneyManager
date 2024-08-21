import { Express } from 'express';
import commonRoutes from "./routes/commonRoutes"
import userRouter from './routes/userRoutes'
import authRouter from './routes/authRoutes'
import categoryRouter from './routes/categoryRoutes'
import transactionRouter from './routes/transactionRoutes'
import bodyParser from 'body-parser';

export const routes = (app: Express) => {

    // Middleware
app.use(bodyParser.json());

    //routes
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter)
    app.use('/api/user', authRouter)
    app.use('/api/categories', categoryRouter)
    app.use('/api/transactions', transactionRouter)
    app.use('', commonRoutes)
};

