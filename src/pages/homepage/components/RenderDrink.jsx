import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles.module.css"
export default function RenderDrink({el,category}) {
  return <div>
                <Link to={`drink?id=${el.idDrink}`} className={styles.link}>
                    <div className={styles.drink}>
                            <img src={el.strDrinkThumb} className={styles.drinkImg} />
                            <p style={{color: '#9D2A2C',width:"100%",textAlign:"start"}} className={styles.cocktailCat}>{category} cocktail</p>
                            <p style={{textAlign:"start",width:'100%',margin:'0'}} className={styles.cocktailTitle}>{el.strDrink}</p>
                    </div>
                </Link>
        </div>;
}
