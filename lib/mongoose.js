import mongoose from "mongoose";

export const connectDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    return await mongoose.connect(process.env.MONGODB_URL);
};
