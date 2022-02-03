import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles.module.css"
import {setDoc,doc,deleteField} from "firebase/firestore"
import { auth } from '../../../firebase-config';
import { db } from '../../../firebase-config';
import { useSelector } from 'react-redux';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useDispatch } from 'react-redux';
import { userRecepies } from '../../../redux/actions/fetchActions';
import StarIcon from '@mui/icons-material/Star';
export default function RenderDrink({el,category}) {
        const data = useSelector((data)=>data.userDrinks?.data?.favourites)
        const dispatch = useDispatch()
        const favKeys = data ? Object.keys(data) : []
        const handleFav = async () => {
                setDoc(doc(db,"users",auth.currentUser.uid),{favourites:{[el.idDrink]:{idDrink:`${el.idDrink}`,strDrink:`${el.strDrink}`,strDrinkThumb:`${el.strDrinkThumb}`,strAlcoholic:`${category}`}}},{merge:true})
                dispatch(userRecepies({type:"attach"}))
        }
        const handleUnFav = async () =>{
                setDoc(doc(db,"users",auth.currentUser.uid),{favourites:{[el.idDrink]: deleteField()}},{merge:true})
                dispatch(userRecepies({type:"attach"}))
        }
  return <div style={{position:"relative"}}>
                <Link to={`/drink?id=${el.idDrink}`} className={styles.link}>
                    <div className={styles.drink}>
                            <img src={el.strDrinkThumb} className={styles.drinkImg} alt='cocktail'/>
                            <p style={{color: '#9D2A2C',width:"100%",textAlign:"start"}} className={styles.cocktailCat}>{category} cocktail</p>
                            <p style={{textAlign:"start",width:'%',margin:'0'}} className={styles.cocktailTitle}>{el.strDrink}</p>
                    </div>
                </Link>
                    { favKeys && favKeys?.includes(`${el.idDrink}`) ? <StarIcon  className={styles.star} onClick={()=>handleUnFav()}/> : <StarOutlineIcon  className={styles.star} onClick={()=>handleFav()}/>}
        </div>
}