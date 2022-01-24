import { createContext } from "react";
import { useState } from "react";
export const CategoryContext = createContext()
export const CategoryProvider = props => {
    const [category,setCategory] = useState('all')
    return (
      <CategoryContext.Provider value={[category,setCategory]}>
           {props.children}
      </CategoryContext.Provider>
    )
}