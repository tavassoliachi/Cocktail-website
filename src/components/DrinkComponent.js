import React,{useEffect, useState} from 'react';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import Ingredients from '../pages/drink/components/ingredients';
import styles from "../pages/drink/styles.module.css"
import {useTranslation} from "react-i18next"
export default function DrinkComponent({drink,loading,id}) {
    const [lang,setLang] = useState("strInstructions")
    const instructions = drink && Object.keys(drink).filter((el)=>el.includes('strInstructions'))
    const {t} = useTranslation()
    return <div className={styles.cont}>
        
    {loading ? <div style={{display:"flex",justifyContent:"center"}}><CircularProgress/></div> : 
    drink ?
    <div className={styles.drinkCont}>

                <h1 className={styles.drinkName}>{drink?.strDrink}</h1>
            <div className={styles.subDetails}>
                <p className={styles.subDetails}>By David Wondrich</p>
                <p>Updated 01/2/22</p>
            </div>
        <div className={styles.details}>
            <img src={`${drink?.strDrinkThumb}`} style={{height:"50%",width:'40%',minWidth:"300px"}} alt=''/>
            <div className={styles.makingDetails} style={{display:'flex',flexDirection:"column",width:"100%",marginLeft:"40px",justifyContent:"flex-start"}}>
                {drink && <Ingredients drink={drink}/>}

                <div>
                    <div className={styles.stepsTitle}>{t('instructions')}</div>
                {instructions.map((el)=>{
                    const active = lang===el
                    return <>
                    <button disabled={!drink[el]} className={styles.langBtn} style={active ? {backgroundColor:"black",color:"white"} : {backgroundColor:"white",color:'black'}} onClick={()=>setLang(el)}>{el !== 'strInstructions' ? el.substring('strInstructions'.length) : "ENG"}</button>
                    </>
                })}

                <h1 className={styles.steps} style={{width:'60%'}}>{drink[lang]}</h1>
                </div>
            </div>
    </div></div>
    :
    <div style={{width:"100%",display:"flex",justifyContent:"center",flexDirection:"column"}}>
        <h1 style={{width:'100%',textAlign:"center",fontWeight:"600"}}>{`Drink with id ${id} was not found`}</h1>
        <Link style={{margin:'auto',textDecoration:'none'}} to="/"><button style={{backgroundColor:"#06273A",color:'white',border:"none",width:"100px",height:"40px",borderRadius:"2px",cursor:"pointer"}}>Home</button></Link>
    </div>
    }


</div>
}
