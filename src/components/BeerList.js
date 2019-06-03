import React, {Component} from "react"
import NavBar from "./NavBar"
import Filters from "./Filters"
import createBeerCards from "../logic/createBeerCards"
import createBeerPage  from "../logic/createBeerPage"

class BeerList extends Component {
   constructor() {
       super()
       this.state = {
         isLoading: false,
         hasMore: true,
         error: false,
         cardIsVisited: false,
         beers: [],
         beerPage: 0,
         filtersValues: {
           foodPairing: "",
           hops: [],
           ebc: [],
           ibu: [],
           searchString: ""
         }
       }
      this.handleScroll = this.handleScroll.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleFiltersValues = this.handleFiltersValues.bind(this)
    } 
    
    handleScroll() {
      window.onscroll = () => {
        if (this.state.error || this.state.isLoading || !this.state.hasMore) return       
        if (
          (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !this.state.cardIsVisited
        ) {
          this.loadBeerCards()
        }
      }
    }
   
   handleClick(id) {
     if (!this.state.beerPage && id===0) return
     this.setState(prevState => {
       return {
       cardIsVisited: !prevState.cardIsVisited,
       beerPage: id
       }
     })
   }
  
   handleSubmit(e) {
     e.preventDefault()
     let {name, value} = e.target.searchString
     this.setState({filtersValues:{...this.state.filtersValues, [name]: value}})
   }
  
   handleFiltersValues(filterValues) {
      let filters = this.state.filtersValues
      for (let object of filterValues) {
        const {filterKey, value} = object
        filters[filterKey] = value
      }
      this.setState({filtersValues: filters})
   }

   componentDidMount() {
      if (this.state.beers.length < 1) {this.loadBeerCards()}
      window.addEventListener('scroll', this.handleScroll, true)
   }
  
   componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll, true);
   }
   
   loadBeerCards() {
       this.setState({isLoading: true}, () => {
         const beers = this.state.beers;
         const page = (this.state.beers.length / 12) + 1;
         const hasMore = Number.isInteger(page)
         if(hasMore === false) {
           this.setState({hasMore: false, isLoading: false})
           return
         }
         fetch(`https://api.punkapi.com/v2/beers?per_page=12&page=${page}`)
           .then(response => response.json())
           .then(data => {
               for (let item of data) {
                 beers.push(item)
               }
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
             });
           })
        })
   }
 
   render()  {
       let beerCards = createBeerCards(this.state.beers, this.handleClick, this.state.filtersValues)
       let beerPage = createBeerPage(this.state.beers, this.state.beerPage, this.handleClick)
       const text = this.state.isLoading ? "Loading..." : null
       
       return (
           <div>
             <NavBar handleClick={this.handleClick}/>
             {!this.state.cardIsVisited && <Filters
                                             filtersValues={this.state.filtersValues}
                                             handleSubmit={this.handleSubmit}
                                             handleSliders={this.handleSliders}
                                             handleFiltersValues={this.handleFiltersValues}
                                            />
             }
             <div className="container-fluid" id="main">
                 <div className="row beer-list">                  
                   {!this.state.cardIsVisited && beerCards}
                 </div>
                 <div>
                   {this.state.cardIsVisited && beerPage}
                 </div>
                 <h1 className="loading">{text}</h1>
             </div>
           </div>
       )
   }
  
}

export default BeerList


