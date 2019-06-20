import React, {Component} from "react"

class HopPill extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const text = this.props.text
    const styles = {
      link: {
        color: "inherit",
        fontSize:"14px",
        paddingLeft: "16px",
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "48px",
      },
      div: {
        width:"200px",
        position: "relative",
        height: "42px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginLeft: "6px",
      },
      clearCross: {
        display: "block",
        position: "absolute",
        paddingRight: "10px",
        zIndex: "100000",
        right: "0",
        top: "50%",
        lineHeight:"0.25",
        cursor: "pointer",
        color: "#757575",
      },
    }

    const divClass = this.props.class ?  "hop-pill " + this.props.class : "hop-pill"
    const clearCross = <i
      className="fas fa-times"
      style={styles.clearCross}
      onClick={() => {this.props.clearSelectedPill(this.props.id)}}></i>

    return (
      <div
        style={styles.div}
        className={divClass}
        onClick={() => {this.props.handlePillClick(this.props.id)}}>
        <a
          href="#"
          style={styles.link}>
          {text}
        </a>
        {this.props.selected && clearCross}
      </div>
    )
  }
}

export default HopPill
