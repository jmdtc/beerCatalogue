import React, {Component} from "react"
import BeerLogo from "./BeerLogo"

class NavBar extends Component {
  
   render()  {
       return (
         <div className="navbar-background fixed-top">
           <div className="container-fluid container-navbar">
             <nav className="navbar navbar-expand">
               <a className="navbar-brand navbar-logo" href="#" onClick={() => this.props.handleClick(0)}><BeerLogo /></a>
               <a className="navbar-brand navbar-title" href="#" onClick={() => this.props.handleClick(0)}>Brewdog Catalogue</a>
             </nav>
           </div>
         </div>
       )      
   }  
}

export default NavBar


