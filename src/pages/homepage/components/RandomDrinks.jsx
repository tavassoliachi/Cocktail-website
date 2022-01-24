import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import toolsIMG from "../../assets/tools.png"
import styles from "../styles.module.css"
export default function RandomDrinks({randomDrinks}) {
  return <div>
      <div className={styles.mainRanDrink}>
              <div className={styles.borderDiv}>
                <div>
                    <div className={styles.card}>
                            <img src={randomDrinks[0].strDrinkThumb} />
                    </div>
                    <p className={styles.drinkCat}>{randomDrinks[0].strCategory}</p>
                    <span className={styles.drinkTitle}>{randomDrinks[0].strDrink}</span>
                </div>
              </div>
            
            <div className={styles.ranImages}>
                <div style={{display:'flex',flexDirection:"row",boxSizing:"border-box"}}>
                    <div>
                        <div style={{marginRight:'50px'}} className={styles.ranCard}> 
                            <img src={randomDrinks[1].strDrinkThumb} style={{width:"257px",height:"257px"}}/>
                        </div>
                        <p className={styles.drinkCat}>{randomDrinks[1].strCategory}</p>
                        <span className={styles.drinkTitle}>{randomDrinks[1].strDrink}</span>
                    </div>
                    <div>
                        <div  className={styles.ranCard}>
                            <img src={randomDrinks[2].strDrinkThumb} style={{width:"257px",height:"257px"}}/>
                        </div>
                        <p className={styles.drinkCat}>{randomDrinks[2].strCategory}</p>
                        <span className={styles.drinkTitle}>{randomDrinks[2].strDrink}</span>
                    </div>
                </div>
                    <div className={styles.bottomSection}>
                        <div>
                            <img src={toolsIMG} />
                            <div style={{position:"relative",borderRight:"2.5px dotted white",width:"max-content"}}>
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
  </div>;
}
