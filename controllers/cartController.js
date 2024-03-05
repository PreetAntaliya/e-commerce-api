const cartModel = require("../models/Cart");
const productModel = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    let id = req.body.id;
    let qty = req.body.qty || 1;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Product not found",
      });
    }

    const cartproduct = await productModel.findOne({ _id: id });
    const existingCartProduct = await cartModel.findOne({
      product: cartproduct._id,
    });

    if (existingCartProduct) {
      existingCartProduct.quantity += parseInt(qty);
      await existingCartProduct.save();
    } else {
      const existingCartProduct = await cartModel.create({
        product: cartproduct.id,
        quantity: qty,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Added to cart",
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: "ID is not cleare",
    });
  }
};

const viewCart = async (req, res) => {
  try {
    const product = await cartModel.find().populate("product", "-product_qty");
    return res.status(200).send({
      success: true,
      message: "all cart product finded...",
      product,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: "error" + err,
    });
  }
};

const cartDelete = async (req, res) => {
  try {
    const id = req.query.id;
    const findProduct = await cartModel.findById(id);
    if (findProduct) {
      await cartModel.findByIdAndDelete(id);
      return res.status(200).send({
        success: true,
        message: "Cart product is deleted",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Cart product not found...",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(503).send({
        success: false,
        message: "ID is not cleare",
      });
    }
  }
};

const cartUpdate = async (req, res) => {
  try {
    const id = req.query.id;
    const check = await cartModel.findById(id);
    const { product, qty } = req.body;
    if (check) {
      const update = await cartModel.findByIdAndUpdate(id, {
        product,
        quantity: qty || 1,
      });
      return res.status(200).send({
        success: true,
        message: "Cart product successfully update",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Cart product not found...",
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(503).send({
        success: false,
        message: "ID is proper input",
      });
    }
  }
};

module.exports = {
  addToCart,
  viewCart,
  cartDelete,
  cartUpdate,
};
