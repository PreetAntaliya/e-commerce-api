const subcategoryModel = require('../models/Subcategory');
const productModel = require("../models/Product");

const addSubcategory = async (req, res) => {
    try {
        let subcategory = req.body.subcategory;
        const categoryId = req.body.categoryId
        const status = req.body.status;

        if (!subcategory || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "Subcategory name and CategoryId are required.",
            });
        }

        const check = await subcategoryModel.findOne({ subcategory: subcategory });

        if (check) {
            return res.status(400).json({
                success: false,
                message: "Subcategory already exists with this name.",
            });
        }

        const subcategoryCreate = await subcategoryModel.create({
            categoryId: categoryId,
            subcategory: subcategory,
            status: status
        });

        return res.status(201).json({
            success: true,
            message: "Subcategory successfully created.",
            subcategory: subcategoryCreate,
        });
    } catch (err) {
        return res.status(503).json({
            success: false,
            message: "Internal server error.",
            error: err.message
        });
    }
}

const subcategoryView = async (req,res) => {
    try{
        const subcategory = await subcategoryModel.find({}).populate('categoryId')
        return res.status(201).json({
            success: true,
            message: "Subcategory successfully created.",
            subcategory: subcategory,
        });
    }catch(err){
        return res.status(503).json({
            success: false,
            message: "Internal server error.",
            error: err.message
        });
    }
}

const subcategoryStatus = async(req,res) => {
    try{
        const id = req.query.id;
        const subcategory = await subcategoryModel.findById(id);

        if(!subcategory){
            return res.status(400).json({
                success: false,
                message: "Category not found...",
            });
        }

        let updatedStatus;
        if (subcategory.status === 1) {
            updatedStatus = 0;
        } else {
            updatedStatus = 1;
        }

        let update = await subcategoryModel.findByIdAndUpdate(id, { status: updatedStatus });
        
       return res.status(200).json({
           success : true,
           message : `status updated...`
       })
    }catch(err){
        console.log(err);
        return false;
    }
}

const subcategoryDelete = async(req,res) => {
    try{
        const id = req.query.id;
        const findSubCategory = await subcategoryModel.findById(id);
        if(findSubCategory){
            
            await subcategoryModel.findByIdAndDelete(id);
            await productModel.deleteMany({subcategoryId : id})
            return res.status(200).send({
                success : true,
                message : "Subategory is deleted" 
            })
        }
        return res.status(400).json({
            success: false,
            message: "Subcategory not found...",
        })
    }catch(err){
        if(err.name === "CastError"){
            return res.status(503).send({
                success : false,
                message : "ID is not cleare"
            })
        }
    }
}

const subcategoryUpdate = async (req, res) => {
    try {
      const id = req.query.id;
      const check = await subcategoryModel.findById(id);
      if (check) {
        const update = await subcategoryModel.findByIdAndUpdate(id, {
          subcategory: req.body.subcategory,
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
    addSubcategory,
    subcategoryView,
    subcategoryStatus,
    subcategoryDelete,
    subcategoryUpdate
};
