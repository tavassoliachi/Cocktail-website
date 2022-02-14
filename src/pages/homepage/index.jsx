import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDrinks } from '../../redux/actions/fetchActions';
import { fetchRandomDrinks } from '../../redux/actions/fetchActions';
import { useSelector } from 'react-redux';
import styles from "./styles.module.css"
import Drinks from './components/Drinks';
import subLogo from "../../assets/Capture.PNG";
import { debounce } from 'lodash';
import RandomDrinks from './components/RandomDrinks';
import {Helmet} from "react-helmet";
export default function Homepage() {
    const dispatch = useDispatch()
    const alc = useSelector((data)=>{return data.alcoholicData})
    const alcData = alc?.data?.drinks
    const alcLoading = alc?.loading

    const nonAlc = useSelector((data)=>{return data.nonAlcoholicData})
    const nonAlcData = nonAlc?.data?.drinks
    const nonAlcLoading = nonAlc?.loading

    const randomDrinks = useSelector((data)=>{return data.randomDrinkData})
    const randomDrinksData = randomDrinks.data
    const randomDrinksLoading = randomDrinks?.loading


    useEffect(()=>{
        dispatch(fetchRandomDrinks(3)) 
        const alc = debounce(()=>dispatch(fetchDrinks("alcoholic")),200)
        const nonAlc = debounce(()=>dispatch(fetchDrinks("nonAlcoholic")),400)
        alc()
        nonAlc()
    },[])

    const user = useSelector((data)=>data.loginUser.data)
  return <div className={styles.mainCont}>
            <Helmet>
                <title>Homepage</title>
            </Helmet>
    <div className={styles.randomSection} >
        <div style={{width:"100%",display:'flex',justifyContent:"center",allignItems:'center',marginBottom:"20px"}}>
            <img src={subLogo} style={{width:'70%',maxHeight:"150px",objectFit:"contain",transform:"translateX(-5px)"}} alt=''/>
        </div>
        
        {randomDrinksData && ( <RandomDrinks randomDrinks={randomDrinksData} loading={randomDrinksLoading}/> )}
    </div>

        <Drinks drinks={alcData} thisCat="alcoholic" loading={alcLoading}/>

        <Drinks drinks={nonAlcData} thisCat="nonAlcoholic" loading={nonAlcLoading}/>

        
         </div>
}
