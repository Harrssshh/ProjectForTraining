const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        const connection=await mongoose.connect("mongodb://localhost:27017/projecttraining");

        console.log("MongoDB connected");
}catch(error){
    console.log(error);
}
}

module.exports=connectDB;