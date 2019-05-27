import React, {Component} from "react"
import BeerSlider from "./BeerSlider"

class ExpandedFilters extends Component {
  
  render() {
    const foodExpanded =
        <div className="expanded-button expanded-food">
          <h3>Search food pairing</h3>
          <form>
            <input /> 
          </form>
        </div>
        
  const hopsExpanded =
        <div className="expanded-button expanded-hops">
          <input type="checkbox" name="hops" value="" id="hops1"/><label htmlFor="">Hops 1</label><br/>
          <input type="checkbox" name="twentyLitters" value="" /><label>Hops 1</label><br/>
          <input type="checkbox" name="twentyLitters" value="" /><label>Hops 1</label><br/>
          <input type="checkbox" name="twentyLitters" value="" /><label>Hops 1</label><br/>
        </div>
  
  const EBCprops = this.props.filterButtons[2]
  const EBCExpanded = <BeerSlider
                        classes="expanded-button expanded-EBC"
                        filterProps={EBCprops}
                        handleSliderValue={this.props.handleSliderValue}
                        />
        
  const bitternessProps = this.props.filterButtons[3]
  const bitternessExpanded = <BeerSlider
                               classes="expanded-button expanded-bitterness"
                               filterProps={bitternessProps}
                               handleSliderValue={this.props.handleSliderValue}
                               />
  
  if (this.props.filterButtons.length < 1) return
  return (
      <div>
        {this.props.filterButtons[0].expanded && foodExpanded}
        {this.props.filterButtons[1].expanded && hopsExpanded}
        {EBCprops.expanded && EBCExpanded}
        {bitternessProps.expanded && bitternessExpanded}
      </div>
    )
  }
}

export default ExpandedFilters