import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectdb from "./config/mongodb.js";
import configcloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userroutes.js";
import productRouter from "./routes/productroute.js";

// app config
const app = express();

const port = process.env.PORT || 4000;

connectdb();
configcloudinary();

//middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));

//api endpoints
app.use("/api/user",userRouter);
app.use('/api/product',productRouter)

app.get("/",(req,res) => {
    res.send("Home Route");
})

app.listen(port, () => {
    console.log("Server running on PORT: "+port);
})