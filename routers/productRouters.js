const {createProduct,getAllProducts,getProductById,getAllProductsAdmin, updateProduct,deleteProduct} = require('../controllers/productController');
const {authenticateTokenAdmin} = require('../JWT/JWT_authenticateAdmin');
const {upload} = require('../uploadPhoto')

exports.productRouters = (app)=>{
    app.get('/products', getAllProducts);
    app.get('/products/adm', getAllProductsAdmin);
    app.get('/products/getOne/:id', getProductById);
    app.post('/products/create', authenticateTokenAdmin, upload.array("photo"), createProduct);
    app.put('/products/update',  authenticateTokenAdmin, upload.array("photo"),  updateProduct);
    app.delete('/products/delete/:id',   authenticateTokenAdmin, deleteProduct);
}