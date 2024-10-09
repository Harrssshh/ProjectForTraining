const Product=require('../model/product');

const getAllProducts=async(req,res,next)=>{
    try {
        const products=await Product.find({});
        return res.send({msg:"product",data:products});
    } catch (error) {
        next(error)
    }
}

const addProduct=async(req,res,next)=>{
    const {name,price,category,description}=req.body;
    const productURL=req.file.path;
    try {
        
        const product = new Product({
            name,
            price,
            category,
            description,
            productURL
        });
        await product.save();
        return res.send({msg:"product added successfullt",data:product});
    } catch (error) {
        next(error);
    }
}

const updateProduct=async (req,res,next)=>{
    const {id} =req.params;
    try {
        const isExisting=await Product.findById(id);
        if(!isExisting){
            const error=new Error("product Not Found");
            error.statusCode=404;
            throw(error)
        }
        const product = await Product.findByIdAndUpdate(id,req.body ,{new :true});
        res.status(201).send({msg:"product updated ",data:product});
    } catch (error) {
        next(error);
    }
}

const updateProductWithImage =async (req,res,next)=>{
    const { id }=req.params;
    const productURL=req.file.path;
    try {
        const isExisting=await Product.findById(id);
        if(!isExisting){
            const error=new Error("product Not Found");
            error.statusCode=404;
            throw(error)
        }
        const product = await Product.findByIdAndUpdate(id,{...req.body,productURL : productURL},{new :true});
        return res.status(201).send({msg:"product Update With Image",data:product});
    } catch (error) {
        next(error);
    }
}


module.exports={
    getAllProducts,
    addProduct,
    updateProduct,
    updateProductWithImage
}