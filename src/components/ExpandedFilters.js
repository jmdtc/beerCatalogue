import React, {Component} from "react"
import PillsFilter from "./PillsFilter"
import FoodFilter from "./FoodFilter"
import BeerSlider from "./BeerSlider"
import ExpandedFilterButtons from "./ExpandedFilterButtons"
import scalesDescriptions from "../datas/scalesDescriptions"

class ExpandedFilters extends Component {

  render() {
    const foodProps= this.props.filterButtons[0]
    const foodExpanded =
        <div className="expanded-button expanded-food">
            <FoodFilter
              filterProps={foodProps}
              handleFoodSubmit={this.props.handleFoodSubmit}
              clearFoodPill={this.props.clearFoodPill}
              clearValue={this.props.clearValue}
              handleApplyButton={this.props.handleApplyButton}/>
        </div>

  const hopsProps= this.props.filterButtons[1]
  const hopsExpanded =
        <div>
          <PillsFilter
            filterProps={hopsProps}
            handlePillClick={this.props.handlePillClick}
            clearValue={this.props.clearValue}
            handleApplyButton={this.props.handleApplyButton}/>
        </div>

  const EBCprops = this.props.filterButtons[2]
  const EBCExpanded =
        <div className="expanded-button expanded-EBC">
          <BeerSlider
            filterProps={EBCprops}
            paragraph={scalesDescriptions.ebc}
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
            paragraph={scalesDescriptions.ibu}
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
