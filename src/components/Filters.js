import React, {Component} from "react"
import FilterButton from "./FilterButton"
import SearchFilter from "./SearchFilter"
import ExpandedFilters from "./ExpandedFilters"
import hopsData from "../datas/hopsData"
import moment from 'moment'


class Filters extends Component {
   constructor(props) {
     super(props)
     this.state = {
       filterButtons: [
         {
           name: "Food Pairing",
           filterKey: "foodPairing",
           value: [],
           expanded: false
         },
         {
           name: "Hops",
           filterKey: "hops",
           value: [],
           expanded: false
         },
         {
           name: "EBC / SRM - Colour",
           filterKey: "ebc",
           value: [],
           min: this.props.rangeLimits.ebcRange[0],
           max: this.props.rangeLimits.ebcRange[1],
           marks: {0:"Lager", 16:"Wheat/Ales", 26:"Amber", 45:"Dark"},
           expanded: false
         },
         {
           name: "Bitterness",
           filterKey: "ibu",
           value: [],
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
     this.handleFoodSubmit = this.handleFoodSubmit.bind(this)
     this.clearFoodPill = this.clearFoodPill.bind(this)
     this.handlePillClick = this.handlePillClick.bind(this)
     this.handleApplyButton = this.handleApplyButton.bind(this)
     this.setState = this.setState.bind(this)
   }
  
   static getDerivedStateFromProps(props, state) {
     if (state.filterButtons.some(el => el.expanded)) return null
     
     const filterHasChanged = (arr1, arr2) => {
       return !(arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]))
     }
     
     const stateFilters = [...state.filterButtons]
     const propsFilters = {...props.filtersValues}
     if (stateFilters.some(el => filterHasChanged(el.value, propsFilters[el.filterKey]))) {
       let filterButtons = state.filterButtons
       for (let filter of stateFilters) {
         if (filterHasChanged(filter.value, props.filtersValues[filter.filterKey])) {
           const index = filterButtons.findIndex(el => el.filterKey === filter.filterKey)
           filterButtons[index].value = props.filtersValues[filter.filterKey]
         }
       }
       return filterButtons
     }
     return null;
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
       this.hideOverlay(this.setState, event)
     })
   }

    hideOverlay(setState, event) {
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

    handleOverlayClick(event) {
      const element = document.querySelector(".expanded-button")
      const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )
      if (!element.contains(event.target) && isVisible(element)) {
        this.hideOverlay(this.setState, event)
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
  
   handlePillClick(id) {
    const clickedPill = hopsData.find(hop => hop.id === id)

    this.setState(prevState => {
      let updatedHopsButton = prevState.filterButtons[1]
      if (this.state.filterButtons[1].value.some(hop => hop.id === clickedPill.id)) {
        updatedHopsButton.value = updatedHopsButton.value.filter(el => el.id !== clickedPill.id)
      }
      else {
        updatedHopsButton.value.push(clickedPill)
      }
      let filterButtons = prevState.filterButtons
      filterButtons[1] = updatedHopsButton
      return {filterButtons: filterButtons}
    })
  }
  
  handleFoodSubmit(e) {
    e.preventDefault()
    e.persist()
    if (e.target.input.value.length < 3) return
    this.setState(prevState => {
      const text = e.target.input.value
      let {filterButtons} = prevState
      let {value} = filterButtons[0]
      const key = text + moment()
      const foodPairingQuery = {
        text: text,
        key: key,
        id: key
      }
      value.push(foodPairingQuery)
      filterButtons[0].value = value
      return {filterButtons: filterButtons}
    })
  }
  
  clearFoodPill(id) {
    this.setState(prevState => {
      let {filterButtons} = prevState
      let {value} = filterButtons[0]
      const updatedArray = value.filter(el => el.id !== id)
      filterButtons[0].value = updatedArray
      return {filterButtons: filterButtons}
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

   handleApplyButton(event) {
     this.hideOverlay(this.setState, event)
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
                          handleFoodSubmit={this.handleFoodSubmit}
                          clearFoodPill={this.clearFoodPill}
                          handlePillClick={this.handlePillClick}
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
