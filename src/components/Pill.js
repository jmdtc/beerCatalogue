import React, {Component} from "react"

class Pill extends Component {
  
  render() {
    const styles = {
      normalPill: {
        backgroundColor: "transparent",
        fontSize: "14px",
        border: "solid 1px #BCC1CF",
        color: "black",
        padding: "5px 10px",
        margin: "4px 4px 4px 0px",
        textAlign: "center",
        textDecoration: "none",
        display: "block",
        cursor: "pointer",
        borderRadius: "12px",
        maxWidth: "200px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
      },
      clickedPill: {
        backgroundColor: "#1E85D9",
        fontSize: "14px",
        color: "#fff",
        border: "solid 1px #1E85D9",
        padding: "5px 10px",
        margin: "4px 4px 4px 0px",
        textAlign: "center",
        textDecoration: "none",
        display: "block",
        cursor: "pointer",
        borderRadius: "12px",
        maxWidth: "200px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
      }
    }
    const {name} = this.props
    const pillStyle = this.props.clicked ? styles.clickedPill : styles.normalPill
    
    return (
      <span>
        <button
          type="button"
          style={pillStyle}
          onClick={() => this.props.handlePillClick(this.props.id)}
          checked={this.props.clicked}>
          {name}
        </button>
      </span>
    )
  }
}

export default Pill
