import React, { useEffect,useState } from 'react';
import { fetchSingleDrink, } from '../../redux/actions/fetchActions';
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom";
import Ingredients from './components/ingredients';
import DrinkComponent from '../../components/DrinkComponent';
import { singleDrink } from '../../redux/consts/reducerType';
export default function Drink() {
    
    const dispatch = useDispatch()
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id")
    useEffect(()=>{

        dispatch(fetchSingleDrink(id))
        window.scrollTo(0, 0)
        return  ()=> {
            dispatch({type:`${singleDrink.erase}`})
        }
    },[])

    const drinkDATA = useSelector((el)=>{return el.singleDrinkData})
    const drink = drinkDATA.data
    const loading = drinkDATA.loading



        
  return <DrinkComponent drink={drink} loading={loading} id={id}/> 

}
