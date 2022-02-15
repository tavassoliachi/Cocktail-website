import React,{useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from 'react-external-script-loader';
import { stringify } from '@firebase/util';
export default function SwipeByLook({randomDrinks}) {
  const [my_swiper, set_my_swiper] = useState({});
  const LOOK_DELAY = 500
  const LEFT = window.innerWidth / 4
  const RIGHT = window.innerWidth - window.innerWidth/4
  let startLookTime = Number.POSITIVE_INFINITY;
  let lookDirection = null
  function handleScriptLoad(webgazer) {

     webgazer.setGazeListener((data,timestamp)=>{
       if (data == null || lookDirection === 'stop') return
        if(data.x < LEFT && lookDirection !=='left' && lookDirection !=='reset'){
          startLookTime = timestamp
          lookDirection = 'left'
        }else if(data.x > RIGHT && lookDirection !=='right' && lookDirection !=='reset'){
          startLookTime = timestamp
          lookDirection = 'right'
        }else if(data.x >= LEFT && data.x <=RIGHT){
          startLookTime = Number.POSITIVE_INFINITY
          lookDirection = null
        }
        if(startLookTime + LOOK_DELAY < timestamp){
          // lookDirection === 'left' && 
          if(lookDirection === 'left'){
            prev()
          }else{
            next()
          }
          startLookTime = Number.POSITIVE_INFINITY
          lookDirection = "stop"
          setTimeout(() => {
              lookDirection='reset'
          }, 200);
        }
      }).begin()


  }
  const next = () => {
    document.getElementById("next").click()
  }
  const prev = () => {
    document.getElementById("prev").click()

  }
  return (
    <div>
        <Loader
          url="https://webgazer.cs.brown.edu/webgazer.js"
          global="webgazer"
          onLoad={handleScriptLoad}
            />
            <button id="next" onClick={()=>my_swiper.slideNext()}>next</button>
            <button id="prev" onClick={()=>my_swiper.slidePrev()}>prev</button>
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop
      style={{textAlign:"center",marginTop:"50px"}}
      onInit={(ev) => {
        set_my_swiper(ev)
    }}>

      {randomDrinks && randomDrinks.map((el)=>{
        
        return <SwiperSlide><img src={el.strDrinkThumb} style={{width:"400px",height:"400px"}}/></SwiperSlide>
      })}

    </Swiper>

    </div>
  )
}
