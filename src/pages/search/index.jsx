import React,{useEffect,useState} from 'react';
import { fetchSearchResult } from '../../redux/actions/fetchActions';
import { useDispatch,useSelector } from 'react-redux';
import RenderDrink from '../homepage/components/RenderDrink';
import { useLocation } from 'react-router-dom';
import styles from "./styles.module.css"

export default function Search() {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(()=>{
    const queryParams = new URLSearchParams(window.location.search)
    const key = queryParams.get("q")
    fetchData(key)
  },[location])

  const fetchData = (key) => {
    dispatch(fetchSearchResult(key))
  }
  const results = useSelector((el)=>el.searchData?.data)
  return <div style={{display:'flex',flexDirection:'row',justifyContent:"center",padding:'0 100px',flexWrap:"wrap"}}>
    {results ? results.map((el)=><div className={styles.result}><RenderDrink el={el} category={`${el.strAlcoholic}`}/></div>)
  :
  <h1>No results</h1>  
  }
  </div>;
}
