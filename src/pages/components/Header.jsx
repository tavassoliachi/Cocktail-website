import React from 'react';
import { useContext } from 'react';
import styles from "./styles.module.css"
import { CategoryContext } from '../../context/CategoriesContext';
export default function Header() {
    const [category,setCategory] = useContext(CategoryContext)
  return <div className={styles.header}>
            {window.location.pathname === '/drink' ? 
            <h1 className={styles.webTitle}>COCKTAIL WEBSITE</h1>
            :
            <>
            {['all','alcoholic','nonalcoholic'].map((el)=>
            {
                const active = Boolean(category === el)
                return <h1 className={`${styles.category} ${active && styles.activeCategory}`} onClick={()=>setCategory(el)}>{el.toUpperCase()}</h1>
            })}</>}
        </div>;
}
