import mongoose from "mongoose";

export const mongoConnect = () => {
    mongoose
        .connect(process.env.MONGO_URI, { dbName: "Auth" })
        .then(() => console.log("Databse connected"))
        .catch((err) => console.log(`Error While Database connected ${err}`))
} 
