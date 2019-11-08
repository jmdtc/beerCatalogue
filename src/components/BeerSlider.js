import React, {Component} from "react"
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import {Range} from 'rc-slider'
import getTrackStyle from "../logic/getTrackStyle"


class BeerSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.filterProps.value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  
  handleChange(e) {
    this.setState({ value: e })
  }
  
  render() {
    const wrapperStyle = { width: "80%",
                          margin: "30px" }
    const styles = {
      paragraph: {
        maxWidth: "400px",
        fontSize: "14px",
        margin: "0px 20px"
      },
      h3: {
        margin: "0px 20px"
      }
    }
    
    const trackStyle = this.props.filterProps.filterKey === "ebc" ? getTrackStyle(this.state.value[0], this.state.value[1]) : {}
    
    const dotStyle = this.props.filterProps.filterKey === "ebc" ?
          {
            borderColor:"rgba(213,188,38,0.5)"
          } : {}
    
    const activeDotStyle = this.props.filterProps.filterKey === "ebc" ?
          {
            borderColor:"rgba(213,188,38,0.8)"
          } : {}
    
    const railStyle = this.props.filterProps.filterKey === "ebc" ?
          {
            background: "linear-gradient(90deg, rgba(248,247,83,0.4) 0%,rgba(213,188,38,0.4) 27%,rgba(188,103,51,0.4) 43%,rgba(38,23,22,0.4) 75%,rgba(3,4,3,0.4) 100%)"
          } : {}

      
    return(
      <div className={this.props.classes}>
          <h3 style={styles.h3}>{`${this.props.filterProps.filterKey.toUpperCase()} scale`}</h3>
          <p style={styles.paragraph}>{this.props.paragraph}</p>
          <div style={wrapperStyle}>
            <Range
              min={this.props.filterProps.min}
              max={this.props.filterProps.max}
              value={[this.state.value[0], this.state.value[1]]}
              marks={this.props.filterProps.marks}
              trackStyle={trackStyle}
              dotStyle={dotStyle}
              activeDotStyle={activeDotStyle}
              railStyle={railStyle}
              onChange={e => this.handleChange(e)}
              onAfterChange={(values) => this.props.handleSliderValue(values,this.props.filterProps)}
            />
          </div>
        </div>
    )
  }
}

export default BeerSlider

