import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredient } from '../../../redux/actions/fetchActions';
import { useSelector } from 'react-redux';
import styles from "../styles.module.css"
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

export default function Ingredients({drink}) {
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 320,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }));
    useEffect(()=>{
        ingredientDetails()
    },[])
    const dispatch = useDispatch()
    const ingredientDetails = () => {
        var ingredients = []
        const keys = drink  ? Object.keys(drink).filter((el)=>el.includes("strIngredient") && drink[el]) : []
        keys?.forEach((el)=>{return ingredients.push(drink[el])})
        ingredients.length && dispatch(fetchIngredient(ingredients))
    }
    const data = useSelector((el)=>{return el.ingredientsData.data})

    const handleTitle = (index) => {
      var text = data[index]?.strDescription || "Desctiption for this ingredient was not found"
      var seeMore = false
      const words = text?.split(' ')
      if(words.length > 100){
            seeMore = true
            words.length=50
            text=words.join(" ") + '...'
      }

       return [text,seeMore && <Link to="/">See more</Link>]
    }
  return (
        <div>
             {drink && data && <div>
                  <div className={styles.stepsTitle}>Ingredients</div>
                  {
                  Object.keys(drink).filter((el)=>el.includes("strIngredient") && drink[el]).map((el,index)=>
                     {
                           return <HtmlTooltip placement="left" key={el} title={<p id='index'>{handleTitle(index)}</p>}>
                                       <h1 className={styles.steps} >{drink[el]} - {drink[`strMeasure${index+1}`]}</h1>
                                 </HtmlTooltip>

                     })
   
                  }
               </div>}

        </div>
  );
}
