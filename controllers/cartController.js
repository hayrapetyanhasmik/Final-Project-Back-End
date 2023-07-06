const {Cart} = require('../models');
const {CartItem} = require('../models');
const {Product} = require('../models');
const {Image} = require('../models');


exports.createCartAndCartItem = async (req, res) => {
    const { UserId, ProductId, quantity } = req.body;
    try {
      let cart = await Cart.findOne({ where: { UserId } });
    if(!cart){
      cart = await Cart.create({ UserId });
    }
    let cartItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductId }
    });
    if(!cartItem){
      cartItem = await CartItem.create({
        CartId: cart.id,
        ProductId,
        quantity
      });
    }else{
      cartItem.quantity += quantity;
      await cartItem.save();
    }
      res.json({ cart, cartItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.getCartById = async(req, res)=> {
    const { id } = req.params;
    try {
      const cart = await Cart.findOne({ where: { UserId: id } });
      if (cart) {
        const cartItems = await CartItem.findAll({
          where: { CartId: cart.id },
          include: {
            model: Product,
          },
        });
  
        for (const cartItem of cartItems) {
          const product = cartItem.Product;
  
          console.log(product.Image);
          if (product) {
            const image = await Image.findAll({
              where: { ProductId: product.id },
            });
            if (image) {
              product.dataValues.Image = image;
            }
          }
        }
  
        res.status(201).json( cartItems);
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// exports.updateCart = async(req, res)=>{
//     try{
//         const {id} = req.body;
//         const data = await Cart.update({where:{id}})
//         res.status(200).json({message: "Cart updated!",data:data})
//     }
//     catch(err){
//         res.status(500).json({message: "Something went wrong!"})
//     } 
// };

// exports.deleteCart = async(req, res)=>{
//     try{
//         const {id} = req.body;
//         const data = await Cart.destroy({where:{id}})
//         res.status(204).json({message: "Cart deleted!"})
//     }
//     catch(err){
//         res.status(500).json({message: "Something went wrong!"})
//     } 
// };