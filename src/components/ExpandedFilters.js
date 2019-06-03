import React, {Component} from "react"
import BeerSlider from "./BeerSlider"
import ExpandedFilterButtons from "./ExpandedFilterButtons"

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
  const EBCExpanded =
        <div className="expanded-button expanded-EBC">
          <BeerSlider
            filterProps={EBCprops}
            handleSliderValue={this.props.handleSliderValue}
          />
          <ExpandedFilterButtons
            filter={EBCprops}
            clearValue={this.props.clearValue}
            handleApplyButton={this.props.handleApplyButton}
          />
        </div>
        
  const bitternessProps = this.props.filterButtons[3]
  const bitternessExpanded = 
        <div className="expanded-button expanded-bitterness">
          <BeerSlider
            filterProps={bitternessProps}
            handleSliderValue={this.props.handleSliderValue}
          />
          <ExpandedFilterButtons
            filter={bitternessProps}
            clearValue={this.props.clearValue}
            handleApplyButton={this.props.handleApplyButton}
          />
        </div>

  
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