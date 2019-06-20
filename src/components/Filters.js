import React, {Component} from "react"
import FilterButton from "./FilterButton"
import SearchFilter from "./SearchFilter"
import ExpandedFilters from "./ExpandedFilters"
import hopsData from "../datas/hopsData"


class Filters extends Component {
   constructor(props) {
     super(props)
     this.state = {
       filterButtons: [
         {
           name: "Food Pairing",
           filterKey: "foodPairing",
           value: "",
           expanded: false
         },
         {
           name: "Hops",
           filterKey: "hops",
           value: [],
           expanded: false
         },
         {
           name: "EBC / SRM - Color",
           filterKey: "ebc",
           value: [this.props.rangeLimits.ebcRange[0],this.props.rangeLimits.ebcRange[1]],
           min: this.props.rangeLimits.ebcRange[0],
           max: this.props.rangeLimits.ebcRange[1],
           marks: {0:"Lager", 16:"Wheat/Ales", 26:"Amber", 45:"Dark"},
           expanded: false
         },
         {
           name: "Bitterness",
           filterKey: "ibu",
           value: [this.props.rangeLimits.ibuRange[0], this.props.rangeLimits.ibuRange[1]],
           min: this.props.rangeLimits.ibuRange[0],
           max: this.props.rangeLimits.ibuRange[1],
           marks: {10:"Wheat", 25:"Pils", 40:"Ales", 120:"IPA++"},
           expanded: false
         },
       ]
     }
     this.handleFiltersClick = this.handleFiltersClick.bind(this)
     this.handleOverlayClick = this.handleOverlayClick.bind(this)
     this.clearValue = this.clearValue.bind(this)
     this.handleSliderValue = this.handleSliderValue.bind(this)
     this.handleApplyButton = this.handleApplyButton.bind(this)
     this.setState = this.setState.bind(this)
   }

   handleFiltersClick(buttonName) {
     this.setState(prevState => {
       const filterButtons = prevState.filterButtons
       const index = filterButtons.map(button => button.name).indexOf(buttonName)
       let updatedFilterButtons = filterButtons.map(button => {
         return {
           ...button,
           expanded: false
         }
       })
       updatedFilterButtons[index].expanded = !filterButtons[index].expanded
       return {
         filterButtons: updatedFilterButtons
       }
     }, () => {
       const main = document.getElementById("main")
       if (this.state.filterButtons.some(button => button.expanded)) {
         main.classList.add('overlay-on')
         return
       }
       main.classList.remove('overlay-on')
     })
   }

    hideOverlay(setState) {
      const outsideClickListener = event => {
              setState(prevState => {
                 const [...filterButtonsState] = prevState.filterButtons
                 const updatedFilterButtons = filterButtonsState.map(button => {
                  return {
                    ...button,
                    expanded: false
                   }
                 })
                 return {filterButtons: updatedFilterButtons}
               })
               this.props.handleFiltersValues(this.state.filterButtons)
               const main = document.getElementById("main")
               main.classList.remove('overlay-on')
               document.removeEventListener('click', outsideClickListener)
          }
         outsideClickListener(event)
    }

    handleOverlayClick() {
      const element = document.querySelector(".expanded-button")
      const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )
      if (!element.contains(event.target) && isVisible(element)) {
        this.hideOverlay(this.setState)
      }
    }

   handleSliderValue(values, filter) {
     const {name, ...props} = filter
     this.setState(prevState => {
       const slider = {...props, name: name, value: values}
       let [...filterButtonsState] = prevState.filterButtons
       filterButtonsState[filterButtonsState.findIndex(filter => filter.name === name)] = slider
       return {filterButtons: filterButtonsState}
     })
   }

   clearValue(filter) {
     this.setState(prevState => {
       const keysMin = Object.keys(filter).some(key => key === "min")
       let clearedFilter  = {}
       if (keysMin) {
         const {min, max, ...props} = filter
         clearedFilter = {...props, min, max}
         clearedFilter.value[0] = min
         clearedFilter.value[1] = max
       }
       else {
         const {value, ...props} = filter
         clearedFilter = {...props}
         clearedFilter.value = typeof value === "object" ? [] : clearedFilter.value = ""
       }
       let [...filterButtonsState] = prevState.filterButtons
       filterButtonsState[filterButtonsState.findIndex(filter => filter.name === clearedFilter.name)] = clearedFilter
       return {filterButtons: filterButtonsState}
     })
   }

   handleApplyButton() {
     this.hideOverlay(this.setState)
   }

   render()  {
      const filterButtons = this.state.filterButtons.map(button => {
          if("min" in button) {
            return <FilterButton
                     key={button.name}
                     name={button.name}
                     range={[button.min, button.max]}
                     value={button.value}
                     classes="filter-button"
                     active={button.expanded
                           || (button.min !== button.value[0] || button.max !== button.value[1])
                           ? true : false}
                     handleFiltersClick={this.handleFiltersClick}
                   />
          }
          else {
            return <FilterButton
                     key={button.name}
                     name={button.name}
                     value={button.value}
                     classes="filter-button"
                     active={button.expanded || button.value.length > 0
                           ? true : false}
                     handleFiltersClick={this.handleFiltersClick}
                   />
          }

       })

      const overlay = <div id="overlay" onClick={(event) => {this.handleOverlayClick(event);}}>
                        <ExpandedFilters
                          filterButtons={this.state.filterButtons}
                          handleSliderValue={this.handleSliderValue}
                          clearValue={this.clearValue}
                          handleApplyButton={this.handleApplyButton}
                        />
                      </div>

       const containerClasses = this.state.filterButtons.some(button => button.expanded) === false ?
             "container-fluid filters-container" :
             "container-fluid filters-container fixed"

       return (
         <div>
           {this.state.filterButtons.some(button => button.expanded) && overlay}
           <div className={containerClasses}>
             <div className="col filters-buttons-container">
               {filterButtons}
               <SearchFilter
                 filterValue={this.props.filtersValues.searchString}
                 handleSubmit={this.props.handleSubmit}
                 clearSearchFilter={this.props.clearSearchFilter}
                 id="searchBar"
                />
             </div>
           </div>
        </div>
       )
   }
}

export default Filters
