import React,{useEffect} from 'react';
import { fetchSearchResult } from '../../redux/actions/fetchActions';
import { useDispatch,useSelector } from 'react-redux';
import RenderDrink from '../homepage/components/RenderDrink';
import { useLocation } from 'react-router-dom';
import styles from "./styles.module.css"
import CircularProgress from '@mui/material/CircularProgress';
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
  const fetchedData = useSelector((el)=>el.searchData)
  const results = fetchedData.data
  const loading = fetchedData.loading
  return <div style={{display:'flex',flexDirection:'row',justifyContent:"center",padding:'0 100px',flexWrap:"wrap"}}>

    {loading ? <CircularProgress style={{marginTop:"100px"}}/> :
      results ? results.map((el)=><div className={styles.result}><RenderDrink el={el} category={`${el.strAlcoholic}`}/></div>)
      :
      <h1>No results</h1>  
  }
  </div>;
}
