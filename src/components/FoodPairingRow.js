import React from "react"
import TitleIcon from "./TitleIcon"

function FoodPairingRow(props){
  const styles = {
    foodItem: {
      backgroundColor: "white",
      padding: "1rem",
      paddingLeft: "24px",
      margin: "1rem 0rem",
      borderRadius: "5px",
      boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    titleDiv: {
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center"
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      display: "inline-block",
      marginBottom: "0px"
    }
  }
  
  const foodPairings = props.food.map(el => {
    return (
      <div
        style={styles.foodItem}
        key={el}><span>{el}</span></div>
    )
  })
  
  return (
  <div>
      <div style={styles.titleDiv}>
        <TitleIcon alt="FoodPairing"/><h3 style={styles.title}>Food pairing recommendations</h3>
      </div>
      {foodPairings}
  </div>
  )
}

export default FoodPairingRow