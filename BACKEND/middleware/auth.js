const JWT =require("jsonwebtoken");

const auth=(req,res,next)=>{
    const authHeaders=req.header("Authorization");
    if(!authHeaders){
        const error= new Error("No Token, Unauthorized!");
        error.statusCode=401;
        return next(error);
    }
    const token=authHeaders.split(" ")[1];

    if(!token){
        const error= new Error("No Token, Unauthorized!");
        error.statusCode=401;
        return next(error);
    }

    try {
        const verifiedUser =JWT.verify(token,process.env.JWT_SECRET);
        req.user=verifiedUser;
        next();
    } catch (error) {
        error.statusCode =401;
        error.message="unAuthorized";
        next(error);
    }
}

module.exports = auth;