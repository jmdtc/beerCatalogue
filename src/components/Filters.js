import React, {Component} from "react"
import FilterButton from "./FilterButton"
import SearchFilter from "./SearchFilter"
import ExpandedFilters from "./ExpandedFilters"


class Filters extends Component {
   constructor() {
     super()
     this.state = {
       filterButtons: [
         {
           name: "Food",
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
           value: [0,60],
           min: 0,
           max: 60,
           marks: {0:"Lager", 16:"Wheat/Ales", 26:"Amber", 45:"Dark"},
           expanded: false
         },
         {
           name: "Bitterness",
           filterKey: "ibu",
           value: [0,140],
           min: 0,
           max: 140,
           marks: {10:"Wheat", 25:"Pils", 40:"Ales", 120:"IPA++"},
           expanded: false
         },
       ],
     }
     this.handleFiltersClick = this.handleFiltersClick.bind(this)
     this.handleOverlayClick = this.handleOverlayClick.bind(this)
     this.handleSliderValue = this.handleSliderValue.bind(this)
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
  
    handleOverlayClick(event) {
      const element = document.querySelector(".expanded-button")
      const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )
      const hideOnClickOutside = (element, setState) => {
         const removeClickListener = () => {
            document.removeEventListener('click', outsideClickListener)
         }
      	 const outsideClickListener = event => {
            if (!element.contains(event.target) && isVisible(element)) {
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
               removeClickListener()
            }
          }  
         outsideClickListener(event)
      }
     hideOnClickOutside(element, this.setState)   
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
   
   render()  {
      const filterButtons = this.state.filterButtons.map(button => {
          if("min" in button) {
            return <FilterButton
                   key={button.name}
                   text={button.name}
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
                   text={button.name}
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
               <SearchFilter handleSubmit={this.props.handleSubmit}/>
             </div>
           </div>
        </div>
       )      
   }  
}

export default Filters


