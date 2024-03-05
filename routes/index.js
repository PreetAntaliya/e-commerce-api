const express = require( 'express' );
const routes = express.Router()
const loginController = require('../controllers/loginController')
const categoryController = require('../controllers/categoryController')
const subcategoryController = require('../controllers/subcategoryController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const {verifyToken, roleBaseAuth} = require('../middleware/Auth');

// login
routes.post('/register',loginController.createUser)
routes.get('/allUser',loginController.allUser)
routes.post('/login',loginController.login)
routes.post('/changePassword',verifyToken,loginController.changePassword)

// category
routes.post('/categoryAdd',verifyToken,roleBaseAuth(["admin"]), categoryController.addCategory)
routes.get('/categoryView',verifyToken, categoryController.viewCategory)
routes.post('/categoryStatus',verifyToken, categoryController.categoryStatus)
routes.delete('/categoryDelete',verifyToken, categoryController.categoryDelete)
routes.put('/categoryUpdate',verifyToken, categoryController.categoryUpdate)

// subcategory
routes.post('/subcategoryAdd',verifyToken, subcategoryController.addSubcategory)
routes.get('/subcategoryView',verifyToken, subcategoryController.subcategoryView)
routes.post('/subcategoryStatus',verifyToken, subcategoryController.subcategoryStatus)
routes.delete('/subcategoryDelete',verifyToken, subcategoryController.subcategoryDelete)
routes.put('/subcategoryUpdate',verifyToken, subcategoryController.subcategoryUpdate)

// product
routes.post('/productAdd',verifyToken, productController.addProduct)
routes.get('/productView',verifyToken, productController.viewProduct)
routes.post('/productStatus',verifyToken, productController.productStatus)
routes.delete('/productDelete',verifyToken, productController.productDelete)
routes.put('/productUpdate',verifyToken, productController.productUpdate)

// cart
routes.post('/addToCart',verifyToken, cartController.addToCart);
routes.get('/cartView',verifyToken, cartController.viewCart);
routes.delete('/cartDelete',verifyToken, cartController.cartDelete);
routes.put('/cartUpdate',verifyToken, cartController.cartUpdate);

module.exports = routes