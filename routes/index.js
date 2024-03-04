const express = require( 'express' );
const routes = express.Router()
const loginController = require('../controllers/loginController')
const categoryController = require('../controllers/categoryController')
const subcategoryController = require('../controllers/subcategoryController')
const productController = require('../controllers/productController')
const {verifyToken, roleBaseAuth} = require('../middleware/Auth');

// login
routes.post('/register',loginController.createUser)
routes.get('/allUser',loginController.allUser)

// category
routes.post('/categoryAdd', categoryController.addCategory)
routes.get('/categoryView', categoryController.viewCategory)
routes.post('/categoryStatus', categoryController.categoryStatus)
routes.delete('/categoryDelete', categoryController.categoryDelete)
routes.put('/categoryUpdate', categoryController.categoryUpdate)

// subcategory
routes.post('/subcategoryAdd', subcategoryController.addSubcategory)
routes.get('/subcategoryView', subcategoryController.subcategoryView)
routes.post('/subcategoryStatus', subcategoryController.subcategoryStatus)
routes.delete('/subcategoryDelete', subcategoryController.subcategoryDelete)
routes.put('/subcategoryUpdate', subcategoryController.subcategoryUpdate)

// product
routes.post('/productAdd', productController.addProduct)
routes.get('/productView', productController.viewProduct)
routes.post('/productStatus', productController.productStatus)
routes.delete('/productDelete', productController.productDelete)
routes.put('/productUpdate', productController.productUpdate)


module.exports = routes