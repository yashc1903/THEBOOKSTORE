import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js'
import formidable from "express-formidable"

const router  = express.Router()

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)//create product || method post

router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

router.get('/get-products',getProductController)//get all products || method get

router.get('/get-product/:slug',getSingleProductController) // get a product || method get

router.get('/product-photo/:pid',productPhotoController) // get image || method get

router.delete('/delete-product/:pid',deleteProductController) // delete product || method delete


export default router