const categoryModel = require("../models/Category");
const subcategoryModel = require("../models/Subcategory");

const viewCategory = async (req, res) => {
  try {
    const allCategory = await categoryModel.find();
    return res.status(200).send({
      success: true,
      message: "all category finded...",
      allCategory,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const category = req.body.category;
    const status = req.body.status;
    const check = await categoryModel.findOne({ category: category });

    if (check) {
      return res.status(400).json({
        success: false,
        message: "Category already exists with this name.",
      });
    }
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "All field is required",
      });
    }
    const categoryCreate = await categoryModel.create({
      category: category,
      status: status,
    });

    return res.status(201).json({
      success: true,
      message: "Category successfully created.",
      user: categoryCreate,
    });
  } catch (err) {
    return res.status(503).send({
      success: false,
      message: err,
    });
  }
};

const categoryStatus = async (req, res) => {
  try {
    const id = req.query.id;
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found...",
      });
    }

    let updatedStatus;
    if (category.status === 1) {
      updatedStatus = 0;
    } else {
      updatedStatus = 1;
    }

    const update = await categoryModel.findByIdAndUpdate(id, {
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

const categoryDelete = async (req, res) => {
  try {
    const id = req.query.id;
    const findCategory = await categoryModel.findById(id);
    if (findCategory) {
      await categoryModel.findByIdAndDelete(id);
      await subcategoryModel.deleteMany({ categoryId: id });
      return res.status(200).send({
        success: true,
        message: "Category is delete",
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
        message: "ID is not cleare",
      });
    }
  }
};

const categoryUpdate = async (req, res) => {
  try {
    const id = req.query.id;
    const check = await categoryModel.findById(id);
    if (check) {
      const update = await categoryModel.findByIdAndUpdate(id, {
        category: req.body.category,
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
  addCategory,
  viewCategory,
  categoryStatus,
  categoryDelete,
  categoryUpdate,
};
