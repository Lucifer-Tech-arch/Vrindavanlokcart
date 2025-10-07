import express from "express";
import cors from "cors";
import 'dotenv/config'
import connectdb from "./config/mongodb.js";
import configcloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userroutes.js";
import productRouter from "./routes/productroute.js";
import router from "./routes/authRoute.js";
import './config/passport.js'
import cartRouter from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";
import reviewRouter from "./routes/reviewroute.js";

// app config
const app = express();

//const port = process.env.PORT || 4000;

connectdb();
configcloudinary();

//middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://vrindavanlokcart-frontend.vercel.app","https://vrindavanlokcart-admin.vercel.app"],
  credentials: true,
}));

//api endpoints
app.use("/api/user",userRouter);
app.use("/api/auth",router);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/review',reviewRouter);

app.get("/",(req,res) => {
  res.send("Welcome to Vrindavan Lok-Cart");
})

app.use((req,res)=> {
  res.status(404).send("Oops... No such Path exists! -> Continue with vrindavan lok cart")
})


/*app.listen(port, () => {
  console.log("Server running on PORT: "+port);
})*/

export default app;
