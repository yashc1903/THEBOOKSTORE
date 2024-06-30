import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { braintreePaymentController, braintreeTokenContoller, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductsController, searchController, updateProductController } from '../controllers/productController.js'
import formidable from "express-formidable"

const router  = express.Router()

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)//create product || method post
router.post('/sell-product',requireSignIn,formidable(),createProductController)//create product || method post

router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

router.get('/get-products',getProductController)//get all products || method get

router.get('/get-product/:slug',getSingleProductController) // get a product || method get

router.get('/product-photo/:pid',productPhotoController) // get image || method get

router.delete('/delete-product/:pid',deleteProductController) // delete product || method delete

router.post('/product-filters', productFiltersController)

router.get('/product-count', productCountController)

router.get('/product-list/:page',productListController)

router.get('/search/:keyword',searchController)//searchbar

router.get(`/related-product/:pid/:cid`,relatedProductsController)

router.get('/product-category/:slug',productCategoryController)

//payments route
//token
router.get('/braintree/token',braintreeTokenContoller)

//payments

router.post('/braintree/payment' ,requireSignIn, braintreePaymentController)


export default router