import { useState,useContext,createContext,useEffect } from "react";



const WishlistContext= createContext()




const WishlistProvider = ({children}) => {
    const [wishlist,setWishlist] = useState([])

    useEffect(()=>{
        let existingWishlistItem = localStorage.getItem('wishlist')
        if(existingWishlistItem) setWishlist(JSON.parse(existingWishlistItem))
    },[])
    
    return (
        <WishlistContext.Provider value={[wishlist,setWishlist]}>
            {children}
        </WishlistContext.Provider>
    )
    
}

//custom hook

const useWishlist = ()=> useContext(WishlistContext)

export{useWishlist,WishlistProvider}