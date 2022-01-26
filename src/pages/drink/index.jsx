import React, { useEffect,useState } from 'react';
import { fetchSingleDrink, } from '../../redux/actions/fetchActions';
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom";
import Ingredients from './components/ingredients';
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
    const [lang,setLang] = useState("strInstructions")
    const instructions = drink && Object.keys(drink).filter((el)=>el.includes('strInstructions'))


  return <div className={styles.cont}>
                {loading ? <div style={{display:"flex",justifyContent:"center"}}><CircularProgress/></div> : 
                drink ?
                <>

                            <h1 className={styles.drinkName}>{drink?.strDrink}</h1>
                        <div className={styles.subDetails}>
                            <p className={styles.subDetails}>By David Wondrich</p>
                            <p>Updated 01/2/22</p>
                        </div>
                    <div className={styles.details}>
                        <img src={`${drink?.strDrinkThumb}`} style={{width:'40%'}} alt=''/>
                        <div style={{display:'flex',flexDirection:"column",width:"100%",marginLeft:"40px",justifyContent:"flex-start"}}>
                            {drink && <Ingredients drink={drink}/>}

                            <div>
                                <div className={styles.stepsTitle}>Instructions</div>
                            {instructions.map((el)=>{
                                const active = lang==el
                                return <>
                                <button disabled={!drink[el]} className={styles.langBtn} style={active ? {backgroundColor:"black",color:"white"} : {backgroundColor:"white",color:'black'}} onClick={()=>setLang(el)}>{el !== 'strInstructions' ? el.substring('strInstructions'.length) : "ENG"}</button>
                                </>
                            })}

                            <h1 className={styles.steps} style={{width:'60%'}}>{drink[lang]}</h1>
                            </div>
                        </div>
                </div></>
                :
                <div style={{width:"100%",display:"flex",justifyContent:"center",flexDirection:"column"}}>
                    <h1 style={{width:'100%',textAlign:"center",fontWeight:"600"}}>{`Drink with id ${id} was not found`}</h1>
                    <Link style={{margin:'auto',textDecoration:'none'}} to="/"><button style={{backgroundColor:"#06273A",color:'white',border:"none",width:"100px",height:"40px",borderRadius:"2px",cursor:"pointer"}}>Home</button></Link>
                </div>
                }

            
        </div>
}
