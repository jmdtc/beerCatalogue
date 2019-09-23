import React, {Component} from "react"
import NavBar from "./NavBar"
import Filters from "./Filters"
import createBeerCards from "../logic/createBeerCards"
import createBeerPage  from "../logic/createBeerPage"
import getFetchUrlParams from "../logic/getFetchUrlParams"
import getNextMultiple from "../logic/getNextMultiple"
import isThereAFilterOn from "../logic/isThereAFilterOn"


class BeerList extends Component {
   constructor() {
       super()
       this.state = {
         isLoading: false,
         error: false,
         hasMore: true,
         cardIsVisited: false,
         beers: [],
         beerPage: 0,
         defaultNumberOfBeers: 12,
         filtersValues: {
           foodPairing: [],
           hops: [],
           ebc: [0,60],
           ibu: [0,140],
           searchString: ""
         },
         rangeLimits: {
           ebcRange: [0,60],
           ibuRange: [0,140],
         }
       }
      this.handleScroll = this.handleScroll.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleFiltersValues = this.handleFiltersValues.bind(this)
      this.clearSearchFilter = this.clearSearchFilter.bind(this)
    } 
    
    handleScroll() {
      window.onscroll = () => {
        const anyFilterOn = isThereAFilterOn(this.state.filtersValues,
                                             this.state.rangeLimits.ebcRange,
                                             this.state.rangeLimits.ibuRange)
        if (this.state.error ||
            this.state.isLoading ||
            !this.state.hasMore ||
            anyFilterOn) return
        
        if (
          (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !this.state.cardIsVisited
        ) {
          this.loadBeerCards()
        }
      }
    }
  
   clearSearchFilter(e) {
     this.setState({isLoading: true}, () => {
       this.setState({isLoading: false,
                      filtersValues:{...this.state.filtersValues, searchString: ""}})
     })
   }
  
   handleClick(id) {
     if ((!this.state.beerPage && id===0) || this.state.isLoading) return
     this.setState(prevState => {
       return {
         ...prevState,
         cardIsVisited: !prevState.cardIsVisited,
         beerPage: id
       }
     })
   }
  
   handleSubmit(e) {
     e.preventDefault()
     let {name, value} = e.target.searchString
     this.setState({filtersValues:{...this.state.filtersValues, [name]: value}}, () => {
        const anyFilterOn = isThereAFilterOn(this.state.filtersValues,
                                      this.state.rangeLimits.ebcRange,
                                      this.state.rangeLimits.ibuRange)
        if (this.state.error ||
            this.state.isLoading ||
            !this.state.hasMore ||
            !anyFilterOn) return
        this.loadBeerCards()
     })    
   }
  
   handleFiltersValues(filterValues) {
      let filters = this.state.filtersValues
      for (let object of filterValues) {
        const {filterKey, value} = object
        filters[filterKey] = value
      }
      this.setState({filtersValues: filters}, () => {
        const anyFilterOn = isThereAFilterOn(this.state.filtersValues,
                                             this.state.rangeLimits.ebcRange,
                                             this.state.rangeLimits.ibuRange)
        if (this.state.error ||
            this.state.isLoading ||
            !this.state.hasMore ||
            !anyFilterOn) return
        this.loadBeerCards()
      })
   }

   componentDidMount() {
      if (this.state.beers.length < 1) {this.loadBeerCards()}
      window.addEventListener('scroll', this.handleScroll, true)
   }
  
   componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll, true)
   }
   
   loadBeerCards() {
       this.setState({isLoading: true}, () => {
         const beers = this.state.beers
         const nextPage = getNextMultiple(this.state.defaultNumberOfBeers, this.state.beers.length) / this.state.defaultNumberOfBeers
         const urlArray = getFetchUrlParams(this.state.filtersValues, this.state.rangeLimits, nextPage)
         
         const fetchBeers = (urlParams) => {
           fetch(urlParams)
           .then(response => response.json())
           .then(data => {
               if (!data.length) {
                 this.setState({isLoading: false})
                 return
               } 
               for (let item of data) {
                 if (beers.some(el => el.id === item.id)) continue
                 beers.push(item)
               }
               const hasMore = beers.length !== 325 ? true : false
               this.setState({
                   isLoading: false,
                   hasMore: hasMore,
                   beers: beers
               })
           })
           .catch((err) => {
             this.setState({
               error: err.message,
               isLoading: false,
             })
           })
         }
         if (urlArray.length < 60) {
           for (const url of urlArray) {
             fetchBeers(url)
           }
         }
         else {
           for (let i=0; i < 60; i++) {
             fetchBeers(urlArray[i])
           }
         }
        })
    }
  

 
   render()  {
       let beerCards = createBeerCards(this.state.beers, this.handleClick, this.state.filtersValues)
       let beerPage = createBeerPage(this.state.beers, this.state.beerPage, this.handleClick)
       const loadingText = this.state.isLoading ? "Loading..." : null

       
       return (
           <div>
             <NavBar handleClick={this.handleClick}/>
             {!this.state.cardIsVisited && <Filters
                                             filtersValues={this.state.filtersValues}
                                             rangeLimits={this.state.rangeLimits}
                                             handleSubmit={this.handleSubmit}
                                             handleFiltersValues={this.handleFiltersValues}
                                             clearSearchFilter={this.clearSearchFilter}
                                            />
             }
             <div className="container-fluid" id="main">
                 <div className="row beer-list">                  
                   {!this.state.cardIsVisited && beerCards}
                 </div>
                 <div>
                   {this.state.cardIsVisited && beerPage}
                 </div>
                 <h1 className="loading">{loadingText}</h1>
             </div>
           </div>
       )
   }
  
}

export default BeerList


