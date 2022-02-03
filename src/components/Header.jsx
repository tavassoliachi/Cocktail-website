import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import Logo from "../assets/mainLogo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authorization } from "../redux/actions/fetchActions";
import SearchIcon from "@mui/icons-material/Search";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);

  function handleExit(e) {
    if (!e.target.id.includes("search")) {
      setSearch(false);
    } else if (e.target.id == "searchIcon") {
      handleRedirect();
    }
  }
  function handleKey(e) {
    if (e.keyCode === 13) {
      handleRedirect();
    }
  }
  function handleRedirect() {
    const input = document.getElementById("search").value;
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
      document
        .getElementById("search")
        .addEventListener("keyup", (e) => handleKey(e));
    }
  }, [search]);

  const user = useSelector((data) => data.loginUser.data);
  return (
    <div className={styles.header}>
      <div style={{ color: "white", position: "absolute", left: "2rem" }}>
        {user?.user?.email ? (
          <>
            <Link to="/myDrinks" className={styles.myDrinks}>
              MY DRINKS{" "}
            </Link>
            <button
              onClick={() => dispatch(authorization({ type: "logOut" }))}
              className={styles.authBtn}
              style={{ left: "1rem" }}
            >
              Log Out
            </button>
          </>
        ) : (
          <div>
            <Link
              to="/login"
              style={{ left: "2rem" }}
              className={styles.authBtn}
            >
              Login
            </Link>
            <Link to="/register" className={styles.authBtn}>
              Register
            </Link>
          </div>
        )}
      </div>

      <Link to="/">
        <img src={Logo} style={{ height: "50px" }} alt="logo" />
      </Link>
      <SearchIcon
        id="searchIcon"
        className={styles.search}
        style={{ color: `${search ? "black" : "white"}` }}
        onClick={() => setSearch(true)}
      />
      {search && (
        <input
          id="search"
          onChange={(e) => handleChange(e)}
          className={styles.searchInput}
        />
      )}
    </div>
  );
}
