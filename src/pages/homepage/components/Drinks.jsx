import React from 'react';
import { useState } from 'react';
import styles from "../styles.module.css"
import RenderDrink from './RenderDrink';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CircularProgress from '@mui/material/CircularProgress';
export default function Drinks({drinks,thisCat,loading}) {
    const [drinkNum,setDrinkNum] = useState(6)
  return <div>
              <h1 className={styles.title}>{thisCat}<ArrowForwardIosIcon style={{color:'#d1843b',paddingLeft:"15px"}}/></h1>
              <div >
              {loading ? <CircularProgress/> :<div>
              <div  className={styles.drinksCont}>
                
                {
                drinks?.slice(0,drinkNum).map((el)=>
                  {
                      return <RenderDrink el={el} key={el.idDrink} category={thisCat}/>
 
                  })
                }
                <button onClick={()=>setDrinkNum(drinkNum+6)} className={styles.showMore}>SHOW MORE</button></div>
                </div>
                }
                </div>
  </div>;
}
