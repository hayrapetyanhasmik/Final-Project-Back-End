const {CartItem,Product} = require('../models');



exports.updateCartItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      let cartItem = await CartItem.findOne({
        where: { ProductId: id },
        include: {
          model: Product,
        },
      });
      if (cartItem) {
        await cartItem.save(); 
        res.status(200).json({ message: "CartItem updated!", data: cartItem });
      } else {
        res.status(404).json({ message: "CartItem not found!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  
  

exports.deleteCartItem = async(req, res)=>{
    const { id } = req.params;
  try {
    const cartItem = await CartItem.findOne({where:{ProductId:id}});
    if (cartItem) {
    await CartItem.destroy({where:{ProductId:id}});
    res.json({ message: 'Cart item deleted successfully', id });
    } else {
    res.status(404).json({ error: 'Cart item not found' });
    }
    } catch (err) {
    res.status(500).json({ error: err.message });
    } 
};