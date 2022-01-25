import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDrinks } from '../../redux/actions/fetchActions';
import { fetchRandomDrinks } from '../../redux/actions/fetchActions';
import { useSelector } from 'react-redux';
import styles from "./styles.module.css"
import Drinks from './components/Drinks';
import image1 from "../../assets/Capture.PNG"
import RandomDrinks from './components/RandomDrinks';
export default function Homepage() {

    const dispatch = useDispatch()
    const alc = useSelector((data)=>{return data.alcoholicData})
    const alcData = alc?.data?.drinks
    alcData && console.log(alc)
    const alcLoading = alc?.loading

    const nonAlc = useSelector((data)=>{return data.nonAlcoholicData})
    const nonAlcData = nonAlc?.data?.drinks
    const nonAlcLoading = nonAlc?.loading

    const randomDrinks = useSelector((data)=>{return data.randomDrinkData})
    const randomDrinksData = randomDrinks.data
    const randomDrinksLoading = randomDrinks?.loading


    useEffect( async ()=>{
        dispatch(fetchDrinks("alcoholic"))
        dispatch(fetchDrinks("nonAlcoholic"))
        dispatch(fetchRandomDrinks(3)) 
    },[])


  return <div className={styles.mainCont}>

    <div className={styles.randomSection} >
        <div style={{width:"100%",display:'flex',justifyContent:"center",allignItems:'center',marginBottom:"20px"}}>
            <img src={image1} style={{width:'500px',transform:"translateX(-5px)"}} alt=''/>
        </div>
        
        {randomDrinksData && ( <RandomDrinks randomDrinks={randomDrinksData} loading={randomDrinksLoading}/> )}
    </div>

        <Drinks drinks={alcData} thisCat="alcoholic" loading={alcLoading}/>

        <Drinks drinks={nonAlcData} thisCat="nonAlcoholic" loading={nonAlcLoading}/>

        
         </div>
}
