import { useState,useEffect } from "react";
import axios from "axios";


export default function useCategory(){
    const [categories,setCategories]  = useState([])

    //get categories

    const getCategories =  async () =>{
        try {
            const {data} = await axios.get(`http://localhost:8080/category/categories`)
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(()=>{getCategories()},[])

    return categories

}