import mongoose from "mongoose";

// use mongoose to connect to our mongo database
export const connectDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    return await mongoose.connect(process.env.MONGODB_URL);
};
