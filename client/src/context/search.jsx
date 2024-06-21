import { useState,useContext,createContext, } from "react";

const SearchContext= createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [value, setValue] = useState({
        keyword:"",
        results: [],
    });

    return (
            <SearchContext.Provider value={{ value, setValue }}>
            {children}
        </SearchContext.Provider>
    )
    
};