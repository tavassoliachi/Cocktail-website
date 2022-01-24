import React from 'react';
import { useState } from 'react';
import styles from "../styles.module.css"
import RenderDrink from './RenderDrink';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function Drinks({drinks,thisCat}) {
    const [drinkNum,setDrinkNum] = useState(6)
  return <div>

              <h1 className={styles.title}>{thisCat}<ArrowForwardIosIcon style={{color:'#d1843b',paddingLeft:"15px"}}/></h1>
              <div style={{display:'flex',flexDirection:"column",alignItems:"center"}}>
              <div className={styles.drinksCont}>
                
                {drinks?.slice(0,drinkNum).map((el)=>
                  {
                      return <RenderDrink el={el} key={el.idDrink} category={thisCat}/>
 
                  })
                }
                </div>
                <button onClick={()=>setDrinkNum(drinkNum+6)} className={styles.showMore}>SHOW MORE</button>
                </div>

  </div>;
}
