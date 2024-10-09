const express=require('express')
const router=express.Router();
const {getAllProducts,addProduct,updateProduct,updateProductWithImage} =require('../controller/product');
const upload =require('../middleware/multer');

router.get('/product',getAllProducts);
router.post('/product',upload.single('productImage'),addProduct);
router.put('/product/:id',updateProduct)
router.put('/productWithImage/:id',upload.single('productImage'),updateProductWithImage);

module.exports=router;