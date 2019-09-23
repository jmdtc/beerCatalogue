import React, {Component} from "react"

class FoodPill extends Component {
  
  render() {
    const styles = {
      foodPill: {
        display: "block",
        position: "relative",
        verticalAlign: "middle",
        backgroundColor: "#1E85D9",
        fontSize: "14px",
        color: "#fff",
        border: "solid 1px #1E85D9",
        padding: "5px 28px 5px 10px",
        margin: "4px 4px 4px 0px",
        textAlign: "center",
        textDecoration: "none",
        borderRadius: "12px"
      },
      clearCross: {
        display: "block",
        position: "absolute",
        zIndex: "100000",
        right: "0",
        paddingRight: "10px",
        top: "0",
        lineHeight:"2.5",
        cursor: "pointer",
        color: "#fff"
      },
      spanText: {
        display: "inline-block",
        textTransform: "capitalize",
        verticalAlign: "middle",
        maxWidth: "200px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
      }
    }
    
    const {text, id} = this.props
    const clearCross = <i
      className="fas fa-times"
      style={styles.clearCross}
      onClick={() => this.props.clearFoodPill(id)}></i>
    
    
    return (
      <div style={styles.foodPill}>
        <span style={styles.spanText}>
          {text}
        </span>
        <span>{clearCross}</span>
      </div>
    )
  }
}

export default FoodPill
