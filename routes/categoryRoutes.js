import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoriesController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

//routes

router.post('/create-category',requireSignIn,isAdmin, createCategoryController) //create category || method post

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)//update category || method put

router.get('/categories',categoriesController)//all categories || method get

router.get('/single-category/:slug',singleCategoryController)//single category || method get

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)





export default router;