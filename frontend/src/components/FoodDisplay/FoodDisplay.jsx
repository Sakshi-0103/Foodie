import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
         {food_list.map((item,index)=>{
          
          // if we select one category then it show images related to that category

          if (category==="All" || category===item.category) {
            return <FoodItem key={index} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
          }       
        })}
      </div>
    </div>
  )
}

export default FoodDisplay