import React from "react"
import TitleIcon from "./TitleIcon"

function BeerCharacteristicsRow(props){
  //console.log(props.items)
  const styles = {
    tile: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1.5rem",
      verticalAlign: "center"
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      display: "inline-block",
      marginBottom: "0px",
      height: "min-content"
    },
    itemContainer: {
      backgroundColor: "white",
      borderRadius: "5px",
      textAlign: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      boxShadow: "0 2px 20px rgba(0,0,0,0.05)"
    },
    property: {
      fontSize: "14px"
    },
    amount: {
      fontSize: "12px"
    },
    coloredDiv: {
      backgroundColor: "#4285F4",
      maxWidth: "",
      width: "70%",
      height: "2px",
      margin: "0 auto",
      marginTop: "4px",
      marginBottom: "6px"
    }
  }
  const items = !Array.isArray(props.items) ? Object.keys(props.items).map(el => {
    return (
      <div className="col-sm-4 mb-3" style={styles.tile} key={el}>
        <div className="col-sm-12 py-3" style={styles.itemContainer}>
          <span style={styles.property}>{el}</span>
          <div style={styles.coloredDiv}></div>
          <span style={styles.amount}>{`${props.items[el].value} ${props.items[el].unit}`}</span>
        </div>
      </div>
    )
  })
  : props.items.map(el => {
    const spanStyle = props.title === "Yeast" ? styles.amount : null
    return (
      <div className="col-sm-4 mb-3" style={styles.tile} key={el.scale}>
        <div className="col-sm-12 py-3" style={styles.itemContainer}>
          <span style={styles.property}>{el.scale}</span>
          <div style={styles.coloredDiv}></div>
          <span style={spanStyle}>{`${el.value}`}</span>
        </div>
      </div>
    )
  })
  
  
  return (
  <div className="mb-4">
      <div style={styles.tile}>
        <TitleIcon alt={props.title}/><h3 style={styles.title}>{props.title}</h3>
      </div>
      <div className="row">{items}</div>
  </div>
  )
}

export default BeerCharacteristicsRow