import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.css"
export default function RenderDrink({el}) {
  return <div>
                <Link to={`drink?id=${el.idDrink}`} className={styles.link}>
                    <div className={styles.drink}>
                            <p key={el.idDrink}>{el.strDrink}</p>
                            <img src={el.strDrinkThumb} style={{width:"230px"}}/>
                    </div>
                </Link>
        </div>;
}
