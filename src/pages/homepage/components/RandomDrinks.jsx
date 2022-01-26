import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import toolsIMG from "../../../assets/tools.png"
import styles from "../styles.module.css"
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
export default function RandomDrinks({randomDrinks,loading}) {
  return <div>
      {loading ? <div style={{display:'flex',justifyContent:'center'}}><div><CircularProgress /></div></div>:
      <div className={styles.mainRanDrink}>
              <div className={styles.borderDiv}>
                <Link to={`/drink?id=${randomDrinks[0].idDrink}`} className={styles.link} style={{textAlign:"left"}}>
                    <div className={styles.card}>
                            <img src={randomDrinks[0].strDrinkThumb} alt='random drink'/>
                    </div>
                    <p className={styles.drinkCat}>{randomDrinks[0].strCategory}</p>
                    <span className={styles.drinkTitle}>{randomDrinks[0].strDrink}</span>
                </Link>
              </div>
            
            <div className={styles.ranImages}>
                <div style={{display:'flex',flexDirection:"row",boxSizing:"border-box"}} className={styles.drinks2}>
                    <Link to={`/drink?id=${randomDrinks[1].idDrink}`} className={styles.link} style={{textAlign:"left"}}>
                        <div className={styles.ranCard}> 
                            <img src={randomDrinks[1].strDrinkThumb} style={{width:"100%"}} alt='random drink'/>
                        </div>
                        <p className={styles.drinkCat}>{randomDrinks[1].strCategory}</p>
                        <span className={styles.drinkTitle}>{randomDrinks[1].strDrink}</span>
                    </Link>
                    <Link to={`/drink?id=${randomDrinks[0].idDrink}`} className={`${styles.link} ${styles.fixpos}`} style={{textAlign:"left"}}>
                        <div className={styles.ranCard}>
                            <img src={randomDrinks[2].strDrinkThumb} style={{width:"100%"}} alt='random Drink'/>
                        </div>
                        <p className={styles.drinkCat}>{randomDrinks[2].strCategory}</p>
                        <span className={styles.drinkTitle}>{randomDrinks[2].strDrink}</span>
                    </Link>
                </div>
                    <div className={styles.bottomSection}>
                        <div className={styles.bottomFirstItem}>
                            <img src={toolsIMG} className={styles.toolsIMG} alt='tools'/>
                            <div style={{position:"relative",width:"max-content"}} className={styles.dottedBorder}>
                                <h1 className={styles.descr}>Home Bar Basics: Everything You Need to Know About Strainers</h1>
                            </div>
                        </div>
                        <div className={styles.contact}>
                            <h1 className={styles.descrTitle}>BECOME A COCKTAIL EXPERT</h1>
                            <p className={styles.descr2}>Get our best cocktail recipes, tips, and more when you sign up for our newsletter.</p>
                            <div className={styles.inputCont}>
                                <input type='text' placeholder='Enter your email' className={styles.email}/>
                                <MailOutlineIcon style={{position:'absolute',left:"10px",top:"8px",color:"#9EC4D7"}}/>
                                <button className={styles.signUp}>SIGN UP</button>
                            </div>
                        </div>
                    </div>

            </div>
          </div>
          }
  </div>;
}
