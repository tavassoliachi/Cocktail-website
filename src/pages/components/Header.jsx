import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css"
import {Link} from "react-router-dom"
import Logo from "../assets/mainLogo.png"
export default function Header() {

  return <div className={styles.header}>
      <Link to="/" >
            <img src={Logo} style={{height:"50px"}}/>
      </Link>
        </div>;
}
