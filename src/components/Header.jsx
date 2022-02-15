import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Logo from "../assets/mainLogo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authorization } from "../redux/actions/fetchActions";
import SearchIcon from "@mui/icons-material/Search";
import {useTranslation} from 'react-i18next'
import flagGE from "../assets/flags/ge.png"
import flagEN from "../assets/flags/en.png"
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const searchRef = useRef();
  const {i18n,t} = useTranslation()
  function handleExit(e) {
    if (!e.target.id.includes("search")) {
      setSearch(false);
    } else if (e.target.id === "searchIcon") {
      handleRedirect();
    }
  }
  function handleKey(e) {
    if (e.keyCode === 13) {
      handleRedirect();
    }
  }
  function handleRedirect() {
    const input = searchRef.current.value;
    input.length && navigate(`search?q=${input}`);
  }
  function handleChange(e) {
    if (
      !e.target.value.length &&
      (window.location.pathname !== "/" || window.location.pathname !== "")
    ) {
      navigate("/");
    }
  }
  useEffect(() => {
    if (search) {
      window.addEventListener("click", (e) => handleExit(e));
      searchRef.current.addEventListener("keyup", (e) => handleKey(e));
    }
  }, [search]);

  const user = useSelector((data) => data.loginUser.data);
  const changeLanguage = (value) =>{
    i18n.changeLanguage(value)
  }
  return (
    <div className={styles.header}>
      <div style={{ color: "white", position: "absolute", left: "2rem" }}>
        {user?.user?.email ? (
          <>
            <Link to="/myDrinks" className={styles.myDrinks}>
              {t('myDrinks')}{" "}
            </Link>
            <button
              onClick={() => dispatch(authorization({ type: "logOut" }))}
              className={styles.authBtn}
              style={{ left: "1rem" }}
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <div className={styles.authCont}>
            <Link
              to="/login"
              style={{ left: "2rem" }}
              className={styles.authBtn}
            >
              {t("login")}
            </Link>
            <Link to="/register" className={styles.authBtn}>
            {t("register")}
            </Link>
          </div>
        )}
      </div>

      <Link to="/">
        <img src={Logo} style={{ height: "50px" }} alt="logo" className={styles.logo}/>
      </Link>
      <div className={styles.langCont} >
        {[{img:flagGE,value:"ge"},{img:flagEN,value:"en"}].map((el)=>{
          return <img className={styles.lang} src={el.img} style={{opacity:i18n.language===el.value ? ".3" : "1"}} onClick={()=>changeLanguage(el.value)}/>
        })}
      </div>
      <SearchIcon
        id="searchIcon"
        className={styles.search}
        style={{ color: `${search ? "black" : "white"}` }}
        onClick={() => setSearch(true)}
      />
      {search && (
        <input
          id="search"
          ref={searchRef}
          onChange={(e) => handleChange(e)}
          className={styles.searchInput}
        />
      )}
    </div>
  );
}
