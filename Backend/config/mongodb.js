import mongoose from "mongoose";

const connectdb = async() => {

    mongoose.connection.on('connected',() => {
        console.log("Database connected succesfully");
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/vrindavan_lok_cart`)
}

export default connectdb