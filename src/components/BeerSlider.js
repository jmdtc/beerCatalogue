import React, {Component} from "react"
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import {Range} from 'rc-slider'



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
    const wrapperStyle = { width: 400, margin: 40 }

      
    return(
      <div className={this.props.classes}>
          <h3>{`${this.props.filterProps.filterKey.toUpperCase()} scale`}</h3>
          <div style={wrapperStyle}>
            <Range
              min={this.props.filterProps.min}
              max={this.props.filterProps.max}
              value={[this.state.value[0], this.state.value[1]]}
              marks={this.props.filterProps.marks}
              onChange={e => this.handleChange(e)}
              onAfterChange={(values) => this.props.handleSliderValue(values,this.props.filterProps)}
            />
          </div>
        </div>
    )
  }
}

export default BeerSlider

