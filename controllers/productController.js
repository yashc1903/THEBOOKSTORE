import slugify from 'slugify'
import productModel from '../models/productModel.js'
import fs from 'fs'
import { send } from 'process'


export const createProductController = async (req,res) => {
    try {
        const {name,slug,description,author,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"}) 
            case !description:
                return res.status(500).send({error:"Description is required"})
            case !author:
                return res.status(500).send({error:"Author is required"})
            case !price:
                return res.status(500).send({error:"Price is required"})
            case !category:
                return res.status(500).send({error:"Category is required"})
            case !quantity:
                return res.status(500).send({error:"Quantity is required"})
            case photo && photo.size >1000000:
                return res.status(500).send({error:"Photo is required and should be less than 1 mb"})
        }


        const products = new productModel({...req.fields,slug:slugify(name)}) 
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"Product created successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in creating the product"
        })
    }
}

export const getProductController = async (req,res)=>{
    try {
        const products = await productModel.find({})
        .populate('category')
        .select('-photo')
        .limit(12)
        .sort({createdAt:-1})
        
        res.status(200).send({
            success:true,
            countTotal : products.length, 
            message:"All Products",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in getting the products"
        })
    }
}

export const getSingleProductController = async (req,res) => {
    try {
        const product  = await productModel.findOne({slug:req.params.slug})
        .select('-photo')
        .populate('category')

        res.status(200).send({
            success:true,
            message:"got the product",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in retreving the product"
        })
    }
}

export const productPhotoController = async(req,res) => {
    try {
        const product = await productModel.findById(req.params.pid)
        .select("photo")
        
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: "failed to retrieve the image"
        })
    }
}

export const deleteProductController = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success:true,
            message:"product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"failed to delete product"
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const {name,slug,description,author,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"}) 
            case !description:
                return res.status(500).send({error:"Description is required"})
            case !author:
                return res.status(500).send({error:"Author is required"})
            case !price:
                return res.status(500).send({error:"Price is required"})
            case !category:
                return res.status(500).send({error:"Category is required"})
            case !quantity:
                return res.status(500).send({error:"Quantity is required"})
            case photo && photo.size >1000000:
                return res.status(500).send({error:"Photo is required and should be less than 1 mb"})
        }


        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true} )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"Product updated successfully",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"failed to update the product"
        })
    }
}

export const productFiltersController  =async (req,res) => {
    try {
        const {checked,radio}  =req.body
        let args = {}
        if(checked.length >0) args.category = checked
        if(radio.length ) args.price  = {$gte : radio[0] ,$lte:radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success:true,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while filtering the products"
        })
    }
}

export const productCountController = async (req,res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"something went wrong"
        })
    }
}

export const productListController = async (req,res) => {
    try {
        const perPage  = 15
        const page = req.params.page ? req.params.page :1
        const products = await productModel
        .find({})
        .select('-photo')
        .skip((page-1)*perPage)
        .limit(perPage)
        .sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"something went wrong"
        })
    }
};

// search product 
export const searchProductController = async (req, res) => {
    try{
        const { keyword } = req
        const resutls = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                ],
        })
        .select("-photo");
    res.josn(resutls);

    } catch (error){
        console.log(error)
        res.status(400).send({
            success:false,
            message: 'Eroor In Search Product API',
            error
        })
    }
}

// similar books
export const relatedBooksController = async (req, res) => {
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(2).populate("category")
        res.status(200).send({
            success:true,
            products,
        })
    } catch(error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message :'Error while getting related books',
            error

        })
    }
}
