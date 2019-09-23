import React, {Component} from "react"
import ExpandedFilterButtons from "./ExpandedFilterButtons"
import FoodPill from "./FoodPill"

class FoodFilter extends Component {
  constructor() {
    super()
    this.state = {
      input: "",
      warning: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.checkSubmitRequirements = this.checkSubmitRequirements.bind(this)
  }
  
  handleChange(e) {
    const {value, name} = e.target
    this.setState({[name]: value})
  }
  
  checkSubmitRequirements() {
    if (this.state.input.length >= 3) {
      this.setState({input:"", warning: false})
      return
    }
    this.setState({warning: true})
  }
  
  render() {
    const styles = {
      buttons: {
        marginLeft: "-6px",
        marginRight: "-6px"
      },
      input: {
        border: "solid 1px #BCC1CF",
        borderRadius: "4px 0px 0px 4px",
        paddingLeft: "6px",
        width: "200px",
        height: "38px"
      },
      inputWarning: {
        border: "solid 1px #E33C36",
        borderRadius: "4px 0px 0px 4px",
        paddingLeft: "6px",
        width: "200px",
        height: "38px"
      },
      submitButton: {
        backgroundColor: "#2196F3",
        color: "#fff",
        fontSize: "16px",
        borderRadius: "0px 4px 4px 0px",
        border: "solid 1px #2196F3",
        height: "38px",
        width: "38px",
        position: "absolute"
      },
      submitButtonWarning: {
        backgroundColor: "#E33C36",
        color: "#fff",
        fontSize: "16px",
        borderRadius: "0px 4px 4px 0px",
        border: "solid 1px #E33C36",
        height: "38px",
        width: "38px",
        position: "absolute"
      },
      warning: {
        color: "#E33C36",
        fontSize: "0.9rem",
      },
      wrappingPillDiv: {
        display: "flex",
        alignContent: "flex-start",
        flexWrap: "wrap",
        maxWidth: "300px",
      }
    }
    const inputStyle = this.state.warning && this.state.input.length < 3 ? styles.inputWarning : styles.input
    const buttonStyle = this.state.warning && this.state.input.length < 3 ? styles.submitButtonWarning : styles.submitButton
    const pills = this.props.filterProps.value.map(el => <FoodPill
                                                           text={el.text}
                                                           key={el.key}
                                                           id={el.key}
                                                           clearFoodPill={this.props.clearFoodPill}/>)
    const warning = <div
                      style={styles.warning}
                      className="mt-1">
                      <span>Please enter at least 3 characters.</span>
                    </div>
    
                                                   
    return (
      <div>
        <h3>Search food pairing</h3>
        <form
          style={{position:"relative"}}
          onSubmit={(e) => {this.checkSubmitRequirements();
                            this.props.handleFoodSubmit(e);}}>
          <input
            value={this.state.input}
            className="food-input"
            name="input"
            placeholder="e.g. Chicken Wings"
            style={inputStyle}
            onChange={this.handleChange}/>
          <button type="submit" style={buttonStyle}><i className="fas fa-plus"></i></button>
          {this.state.input.length < 3 && this.state.warning && warning}
        </form>
        <div className="pt-3" style={styles.wrappingPillDiv}>
          {pills}
        </div>
        <div style={styles.buttons}>
          <ExpandedFilterButtons
          filter={this.props.filterProps}
          clearValue={this.props.clearValue}
          handleApplyButton={this.props.handleApplyButton}/>
        </div>
      </div>
    )
  }
}

export default FoodFilter
