import { useState,useContext,createContext, } from "react";

const SearchContext= createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [auth,setAuth] = useState({
        keyword:"",
        results: [],
    });

    return (
        <SearchContext.Provider value={{ auth, setAuth }}>
            {children}
        </SearchContext.Provider>
    )
    
};