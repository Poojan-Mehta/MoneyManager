import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
        console.log(`Db is successfully connected..`)
    } catch (error) {
        console.log(`Something went wrong`)
    }
}

export default connectDb