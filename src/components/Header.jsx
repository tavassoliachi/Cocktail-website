import React,{useEffect, useState} from 'react';
import styles from "./styles.module.css"
import {Link} from "react-router-dom"
import Logo from "../assets/mainLogo.png"
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
export default function Header() {
  const navigate = useNavigate()
  const [search,setSearch]=useState(false)

  function handleExit(e){
    if(!e.target.id.includes('search')){
      setSearch(false)
    }else if(e.target.id == "searchIcon"){
        handleRedirect()
    } 
  }
  function handleKey(e){
      if (e.keyCode === 13) {
        handleRedirect()
      }

  }
  function handleRedirect(){
      const input = document.getElementById('search').value
      input.length && navigate(`search?q=${input}`)
  }
  function handleChange(e){
      if(!e.target.value.length && (window.location.pathname !== '/' || window.location.pathname !== '')){
        navigate('/')
      }
  }
  useEffect(()=>{
    if(search){
      window.addEventListener('click',(e)=>handleExit(e))
      document.getElementById('search').addEventListener("keyup", (e)=>handleKey(e))
    }
  },[search])
  return <div className={styles.header}>
      <Link to="/" >
            <img src={Logo} style={{height:"50px"}} alt="logo"/>
      </Link>
        <SearchIcon id='searchIcon' className={styles.search} style={{color:`${search ? 'black' : 'white'}`}} onClick={()=>setSearch(true)}/>
      {search &&(<input id='search' onChange={(e)=>handleChange(e)} className={styles.searchInput}/>)}
        </div>
}
