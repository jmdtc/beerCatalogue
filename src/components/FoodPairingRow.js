import React from "react"

function FoodPairingRow(props){
  const styles = {
    
  }
  
  const foodPairings = props.food.map(el => {
    return <div key={el}>{el}</div>
  })
  
  return (
  <div>
      {foodPairings}
  </div>
  )
}

export default FoodPairingRow