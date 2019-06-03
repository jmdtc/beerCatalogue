import React, {Component} from "react"

class ExpandedFilterButtons extends Component {
   
   render()  {
       const filter = this.props.filter
       const {value, min, max} = filter
       const filterOn = value[0] !== min || value[1] !== max 
       const clearButton = <button className="clear-button" onClick={() => {this.props.clearValue(filter)}}>Clear</button>          
       const applyButton = <button className="apply-button" onClick={() => {this.props.handleApplyButton(filter)}}>Apply</button>
       
       return (
         <div className="expanded-button-button-holder">
           {applyButton}
           {filterOn && clearButton}
         </div>
       )      
   }  
}

export default ExpandedFilterButtons


