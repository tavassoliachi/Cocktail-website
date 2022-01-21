import React, { useEffect,useState,useContext } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDrinks } from '../../redux/actions/fetchActions';
import { useSelector } from 'react-redux';
import { CategoryContext } from '../../context/CategoriesContext';
import styles from "./styles.module.css"
import { Link } from 'react-router-dom';
import Drinks from '../components/Drinks';
export default function Homepage() {

    const dispatch = useDispatch()
    const alcData = useSelector((data)=>{return data.alcoholicData.data})
    const nonAlcData = useSelector((data)=>{return data.nonAlcoholicData.data})
    const [category] = useContext(CategoryContext)

    useEffect(()=>{
        if(category==="alcoholic" || category==="all"){
            dispatch(fetchDrinks("alcoholic"))

        }
        if(category==="nonAlcoholic" || category==="all"){
            dispatch(fetchDrinks("nonAlcoholic"))
        }
    },[])

  return <div className={styles.mainCont}>

        <Drinks drinks={alcData} thisCat="alcoholic"/>

        <Drinks drinks={nonAlcData} thisCat="nonAlcoholic"/>
        
         </div>
}
