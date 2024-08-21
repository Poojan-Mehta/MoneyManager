import { Schema, Document, model, Types } from "mongoose";

interface ITransaction extends Document {
    amount: number;
    notes: String;
    type: number; //1=income, 2=expense
    user_id: Types.ObjectId;
    category_id: Types.ObjectId;    
    transaction_date: Date;
    created_date: Date;
}

const transactionSchema = new Schema<ITransaction>({
    amount: {type: Number, required: true},
    notes: {type: String, required: true},
    type: { type: Number, default: 1}, //1=income, 2=expense
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },  // Reference to the Category model
    transaction_date: { type: Date, required: true},
    created_date: { type: Date, default: Date.now}
})

const transaction = model<ITransaction>('Transaction', transactionSchema)

export default transaction;