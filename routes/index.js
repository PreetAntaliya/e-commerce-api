const express = require( 'express' );
const routes = express.Router()
const multer = require('multer')
const loginController = require('../controllers/loginController')
const categoryController = require('../controllers/categoryController')
const subcategoryController = require('../controllers/subcategoryController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const {verifyToken, roleBaseAuth} = require('../middleware/Auth');
const path = require('path')

let uploadCounter = 100000;
const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null, "uploads")
    },
    filename : (req,file,cb) => {
        uploadCounter++;
        let originalExtension = path.extname(file.originalname);
        let img = uploadCounter + "-" + Date.now() + originalExtension;
        cb(null, img);
    }
})

const upload = multer({storage : storage})


// login
routes.post('/register',loginController.createUser)
routes.get('/allUser',loginController.allUser)
routes.post('/login',loginController.login)
routes.post('/changePassword',verifyToken,loginController.changePassword)

// category
routes.post('/categoryAdd',verifyToken,roleBaseAuth(["admin"]), categoryController.addCategory)
routes.get('/categoryView',verifyToken, categoryController.viewCategory)
routes.post('/categoryStatus',verifyToken,roleBaseAuth(["admin"]), categoryController.categoryStatus)
routes.delete('/categoryDelete',verifyToken,roleBaseAuth(["admin"]), categoryController.categoryDelete)
routes.put('/categoryUpdate',verifyToken,roleBaseAuth(["admin"]), categoryController.categoryUpdate)

// subcategory
routes.post('/subcategoryAdd',verifyToken,roleBaseAuth(["admin"]), subcategoryController.addSubcategory)
routes.get('/subcategoryView',verifyToken, subcategoryController.subcategoryView)
routes.post('/subcategoryStatus',verifyToken,roleBaseAuth(["admin"]), subcategoryController.subcategoryStatus)
routes.delete('/subcategoryDelete',verifyToken,roleBaseAuth(["admin"]), subcategoryController.subcategoryDelete)
routes.put('/subcategoryUpdate',verifyToken,roleBaseAuth(["admin"]), subcategoryController.subcategoryUpdate)

// product
routes.post('/productAdd',verifyToken,roleBaseAuth(["admin"]),upload.array('productImg',5), productController.addProduct)
routes.get('/productView',verifyToken, productController.viewProduct)
routes.post('/productStatus',verifyToken,roleBaseAuth(["admin"]), productController.productStatus)
routes.delete('/productDelete',verifyToken,roleBaseAuth(["admin"]), productController.productDelete)
routes.put('/productUpdate',verifyToken,roleBaseAuth(["admin"]), productController.productUpdate)

// cart
routes.post('/addToCart',verifyToken,roleBaseAuth(["admin"]), cartController.addToCart);
routes.get('/cartView',verifyToken, cartController.viewCart);
routes.delete('/cartDelete',verifyToken,roleBaseAuth(["admin"]), cartController.cartDelete);
routes.put('/cartUpdate',verifyToken,roleBaseAuth(["admin"]), cartController.cartUpdate);

module.exports = routes