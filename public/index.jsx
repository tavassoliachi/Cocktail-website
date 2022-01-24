import React, { useEffect, useState } from 'react';
import { fetchSingleDrink } from '../../redux/actions/fetchActions';
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux';
export default function Drink() {
    const dispatch = useDispatch()

    useEffect(()=>{
        const queryParams = new URLSearchParams(window.location.search)
        const id = queryParams.get("id")
        dispatch(fetchSingleDrink(id))
    },[])
    const drink = useSelector((el)=>{return el.singleDrinkData.data})
  return <div className={styles.cont}>
            <img src={`${drink?.strDrinkThumb}`}/>
            <div className={styles.detailCont}>
                <h1 className={styles.drinkName}>{drink?.strDrink}</h1>
                <h2 className={styles.drinkName}>Category: {drink?.strCategory}</h2>
                <div>
                    <h3 className={styles.drinkName}>Instructions1</h3>
                    <h5 className={styles.drinkName}>{drink?.strInstructions}</h5>
                </div>
            </div>
        </div>
}
