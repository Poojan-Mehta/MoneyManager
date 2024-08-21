import { Schema, Document, model } from "mongoose";

interface ICategory extends Document {
    name: string,
    user_id: string,
    is_main: number,
    created_date: Date
}

const categorySchema = new Schema<ICategory>({
    name: {type: String, required: true},
    user_id: {type: String, required: false, default: null},
    is_main: { type: Number, default: 1}, //1 = common categories, 2 = user wise categories
    created_date: { type: Date, default: Date.now}
})

const category = model<ICategory>('Category', categorySchema)

export default category;