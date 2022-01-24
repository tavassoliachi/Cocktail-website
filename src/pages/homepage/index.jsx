import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDrinks } from '../../redux/actions/fetchActions';
import { fetchRandomDrinks } from '../../redux/actions/fetchActions';
import { useSelector } from 'react-redux';
import styles from "./styles.module.css"
import Drinks from './components/Drinks';
import image1 from "../assets/Capture.PNG"
import RandomDrinks from './components/RandomDrinks';
export default function Homepage() {

    const dispatch = useDispatch()
    const alcData = useSelector((data)=>{return data.alcoholicData.data})
    const nonAlcData = useSelector((data)=>{return data.nonAlcoholicData.data})
    const randomDrinks = useSelector((data)=>{return data.randomDrinkData.data})


    useEffect( async ()=>{
        dispatch(fetchDrinks("alcoholic"))
        dispatch(fetchDrinks("nonAlcoholic"))
        dispatch(fetchRandomDrinks(3)) 
    },[])
    


  return <div className={styles.mainCont}>

    <div className={styles.randomSection} >
        <div style={{width:"100%",display:'flex',justifyContent:"center",allignItems:'center',marginBottom:"20px"}}>
            <img src={image1} style={{width:'500px',transform:"translateX(-5px)"}}/>
        </div>
        
        {randomDrinks && ( <RandomDrinks randomDrinks={randomDrinks}/> )}
    </div>

        <Drinks drinks={alcData} thisCat="alcoholic"/>

        <Drinks drinks={nonAlcData} thisCat="nonAlcoholic"/>

        
         </div>
}
