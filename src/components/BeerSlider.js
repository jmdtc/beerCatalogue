import React, {Component} from "react"
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider, { Range } from 'rc-slider'
import Tooltip from 'rc-tooltip'



class BeerSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.setValue = this.setValue.bind(this)
  }
  
  setValue(e) {
    this.setState({ value: e })
  }
  
  componentDidMount() {
    this.setState({ value: this.props.filterProps.value });  
  }  
  
  componentDidUpdate(prevProps, prevState) {
    
  }
  
  render() {
    const wrapperStyle = { width: 400, margin: 40 };
      
    return(
      <div className={this.props.classes}>
          <h3>{`${this.props.filterProps.filterKey.toUpperCase()} scale`}</h3>
          <div style={wrapperStyle}>
            <Range
              min={this.props.filterProps.min}
              max={this.props.filterProps.max}
              value={this.state.value}
              marks={this.props.filterProps.marks}
              onChange={e => this.setValue(e)}
              onAfterChange={(values) => this.props.handleSliderValue(values,this.props.filterProps)}
            />
          </div>
        </div>
    )
  }
}

export default BeerSlider

