import React, {Component} from "react"

class FilterButton extends Component {
   
   render()  {
       const buttonClasses= this.props.active ? "filter-button filter-active" : "filter-button"
       
       return (
           <span className="filter-button-holder">
             <div className="filter-div-holder">
             <button className={buttonClasses} onClick={() => {this.props.handleFiltersClick(this.props.text)}}>{this.props.text}</button>
             </div>
           </span>
       )      
   }  
}

export default FilterButton


