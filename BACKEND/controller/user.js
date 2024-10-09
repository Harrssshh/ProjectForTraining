const User=require("../model/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const signup=async (req,res,next)=>{
    try{
        const {name, email,password,phoneNumber}=req.body;
        const isExisting=await User.findOne({email:email});

        if(isExisting){
            const error=new Error("user already exist");
            error.name="ExistingError";
            error.statusCode=400;
            throw error;
        }
        // const hashedPassword=await bcrypt.hash(password,10);


        const newUser=new User
        ({
            name:name,
            password:password,
            email:email,
            phoneNumber:phoneNumber
        });
        await newUser.save();
        res.status(201).send({message:"account created"});
    }catch(error){
        next(error);
    }
}


const Login=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const isExisting=await User.findOne({email :email});

        if(!isExisting){
            const error=new Error("invalid credentials");
            error.statusCode=404;
            throw error;
        };
        const isMatched= await  bcrypt.compare(password,isExisting.password);

        if(!isMatched){
            const error=new Error("invalid credentials");
            error.statusCode=401;
            throw error;
        }

        const token=jwt.sign({id:isExisting._id,email:isExisting.email,role:isExisting.role},"Harsh@2003",{expiresIn:"1h"});

        res.status(200).send({message:"login successful",data:isExisting,token:token});

    }catch(error){
        next(error);
    }
}
const getAllUsers=async(req,res,next)=>{
    try{
        const users = await User.find();
        return res.send({msg :" users fetch successfully" ,data:users});
    }catch(error){
        next(error);
    }
}

module.exports={signup,Login,getAllUsers}