import React from 'react';
import { useContext,useState } from 'react';
import { CategoryContext } from '../../context/CategoriesContext';
import styles from "./styles.module.css"
import RenderDrink from './RenderDrink';
import { Link } from 'react-router-dom';
export default function Drinks({drinks,thisCat}) {
    const [category] = useContext(CategoryContext)
    const [drinkNum,setDrinkNum] = useState(8)
  return <div>
        {(category === "all" || category === `${thisCat}`) && (
            <>
              <h1 className={styles.title}>{thisCat}</h1>

              <div className={styles.drinksCont}>
                
                {drinks?.slice(0,drinkNum).map((el)=>
                  {
                      return <RenderDrink el={el}/>
 
                  })
                }
                <button onClick={()=>setDrinkNum(drinkNum+8)}>show more</button>
                </div>
            </>
        )}

  </div>;
}
