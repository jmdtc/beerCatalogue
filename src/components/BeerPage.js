import React, {Component} from "react"

class BeerPage extends Component {
  
   render()  {
       return (
           <div className="">
             <div className="beer-page-container">
               <button
               className="go-back-button"
               onClick={() => this.props.handleClick(0)}>
               <i className="fas fa-arrow-left"></i>
               Go back
               </button>
               <h1>{this.props.name}</h1>
               <h2>{this.props.tagline}</h2>
               <p>{this.props.description}</p>
             </div>
           </div>
       )      
   }  
}

export default BeerPage


