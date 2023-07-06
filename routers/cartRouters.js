const {createCartAndCartItem,getCartById,updateCart,deleteCart} = require('../controllers/cartController');

exports.cartRouters = (app)=>{
    app.get('/cart/getOne/:id',  getCartById);
    app.post('/cart/create',  createCartAndCartItem);
}