import React, {Component} from "react"
import BeerList from "./components/BeerList"

class App extends Component {
   constructor() {
       super()
       this.state = {
           beerList: true,
       }
   }
  
  
  
   render() {
       return (
           <div>
               <BeerList />
           </div>
       )
   }
}

export default App




