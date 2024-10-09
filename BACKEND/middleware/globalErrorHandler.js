const errorHandler=(err,req,res,next)=>{
    let statusCode=err.statusCode||500;
    let errorMessage=err.message||"Internal server error";
    if(err.name===ValidationError){
        const errors=Object.values(err.errors).map(error=>error.message);
        statusCode=400;
        errorMessage=errors;
    }
    res.send(statusCode).send({status:"fail", message : errorMessage});

};

module.exports=errorHandler

