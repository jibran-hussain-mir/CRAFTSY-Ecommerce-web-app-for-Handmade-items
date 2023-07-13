import React from 'react'
import "../css/ProductSlider.css"
import { useState } from 'react'


function ProductSlider(props) {
  const [isShown, setIsShown] = useState(props.img1);

  return (  

    <div className="categories-card">
    <div className='image-cards'>
<img src={isShown}

 onMouseEnter={() => {
      setIsShown(props.img2)
    }}
    onMouseOut={() => {
      setIsShown(
        props.img1
      )
    }} alt='img' className='image-of-card' />
    </div>
    <div className='card-heading'>
      {props.title}
    </div>
    <div className='card-pirce'>
    <h3>{props.price}</h3>
    </div>
    <button className='shopnow-btn'>Shop Now</button>
  </div>
  )
}

export default ProductSlider