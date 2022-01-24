import React, { useEffect } from 'react';
import { fetchSingleDrink } from '../../redux/actions/fetchActions';
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux';
export default function Drink() {
    const dispatch = useDispatch()

    useEffect(()=>{
        const queryParams = new URLSearchParams(window.location.search)
        const id = queryParams.get("id")
        dispatch(fetchSingleDrink(id))
    },[])

    const drink = useSelector((el)=>{return el.singleDrinkData.data})
  return <div className={styles.cont}>
                <h1 className={styles.drinkName}>{drink?.strDrink}</h1>
                <div className={styles.subDetails}>
                    <p className={styles.subDetails}>By David Wondrich</p>
                    <p>Updated 01/2/22</p>
                </div>
            <img src={`${drink?.strDrinkThumb}`}/>
            <p className={styles.longDescr}>
                There are all types of drinkers in this world. Some people like their drinks sweet, fruity and fun. Others prefer something smooth and civilized, without too much kick. Then there are the ones who want things to be simple, square-jawed and, well, boozy. I fall in that last category, and for most of the year that’s not a problem. Just give me an Old Fashioned and I’m fine: whiskey, a dot of sugar, a couple dashes of bitters, ice and lemon peel. Simple. Tasty.
                Come winter, though, when I’ve been trudging through the snow or otherwise freezing my ears off, who wants ice? A Hot Toddy is what I crave: whiskey, sugar, boiling water and maybe a sliver of lemon peel. That’s what “toddy” used to mean, anyway. Unfortunately, it has somehow come to mean just about everything but that. Step up to the bar and order one, and you’re likely to end up with a mess of boiled cider, honey, every spice McCormick makes, two or three different liqueurs and, somewhere deep down at the bottom, a tiny speck of whiskey. While there’s nothing wrong with drinking that, it would be nice to be able to get something without all the frills. If only we called it something different...
                Featured Video
                DRAAANKS Hot Toddy
                Fortunately, there is another name for a traditional toddy: a Whisky Skin. Back in the daguerreotype days, that’s what it was called, the “skin” part coming from the lemon peel and the “whisky” part meaning they liked it best with Scotch. It used to be quite popular, too. No wonder—back then, all the Scotch was pure malt; rich, heady stuff that could stand up to a little sugar, water and a lemon peel with no problem at all. Is it just me or do you feel a chill coming on?
            </p>

            
        </div>
}
