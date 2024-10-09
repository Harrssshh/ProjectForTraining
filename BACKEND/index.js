const express=require("express");
const cors=require("cors");
const authRoutes=require("./router/user")
const connectDB=require("./config/db");
const errorHandler=require("./middleware/globalErrorHandler")

const app=express();
connectDB();

app.use(express.json());
app.use(cors());

app.use(errorHandler);

app.use('/auth',authRoutes);

app.listen(5000,()=>{
    console.log("server is running on port 5000");
});