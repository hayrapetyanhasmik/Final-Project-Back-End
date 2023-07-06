const {createCartItem,getCartItemById,updateCartItem,deleteCartItem,getAllCartItems} = require('../controllers/cartItemController');

exports.cartItemRouters = (app)=>{
    app.put('/cartItem/update/:id',  updateCartItem);
    app.delete('/cartItem/delete/:id',  deleteCartItem);
}