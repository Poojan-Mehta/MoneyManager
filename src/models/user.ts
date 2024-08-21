import { Schema, Document, model} from 'mongoose'
import { USER_ROLE_ADMIN, USER_ROLE_NORMAL } from '../constants'

//create interface
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    contact: string;
    dob: Date;
    joinedDate: Date;
    accessToken: string;
    role: number;
}

//create Schema
const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    contact: {type: String, required: true, unique: true},
    dob: {type: Date},
    joinedDate: {type: Date, default: Date.now},
    role: { type: Number, default: USER_ROLE_NORMAL},
    accessToken: {type: String}
})

const user = model<IUser>('User', userSchema)

export default user;