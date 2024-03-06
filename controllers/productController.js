const productModel = require("../models/Product");
const categoryModel = require("../models/Category");
const subcategoryModel = require("../models/Subcategory");

const viewProduct = async (req, res) => {
  try {
    const product = await productModel.find().populate("categoryId").populate("subcategoryId");
    return res.status(200).send({
      success: true,
      message: "all product finded...",
      product,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {categoryId,subcategoryId,product_name,product_price,product_qty,product_description,status} = req.body;
    const productImg = req.files.map(file => file.path)

    if (!categoryId || !subcategoryId || !product_name || !product_price || !product_qty || !product_description || !productImg) {
      return res.status(400).json({
        success: false,
        message: "All field is required",
      });
    }
    const productCreate = await productModel.create({
      categoryId,
      subcategoryId,
      product_name,
      productImg ,
      product_price,
      product_qty,
      product_description,
      status
    });

    return res.status(201).json({
      success: true,
      message: "Product successfully created.",
      user: productCreate,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};

const productStatus = async (req, res) => {
  try {
    const id = req.query.id;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found...",
      });
    }

    let updatedStatus;
    if (product.status === 1) {
      updatedStatus = 0;
    } else {
      updatedStatus = 1;
    }

    const update = await productModel.findByIdAndUpdate(id, {
      status: updatedStatus,
    });

    return res.status(200).json({
      success: true,
      message: `status updated...`,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const productDelete = async (req, res) => {
  try {
    const id = req.query.id;
    const findProduct = await productModel.findById(id);
    if (findProduct) {
      await productModel.findByIdAndDelete(id);
      return res.status(200).send({
        success: true,
        message: "Category is delete",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Product not found...",
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

const productUpdate = async (req, res) => {
  try {
    const id = req.query.id;
    const check = await productModel.findById(id);
    const {categoryId,subcategoryId,product_name,product_price,product_qty,product_description} = req.body;
    if (check) {
      const update = await productModel.findByIdAndUpdate(id, {
        categoryId,
        subcategoryId,
        product_name,
        productImg : req.files.path,
        product_price,
        product_qty,
        product_description,
      });
      return res.status(200).send({
        success: true,
        message: "Category successfully update",
      });
    }
    return res.status(400).json({
        success: false,
        message: "Category not found...",
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
  addProduct,
  viewProduct,
  productStatus,
  productDelete,
  productUpdate,
};
