import React, {Component} from "react"

class BeerCard extends Component {
  
   render()  {
       return (
           <div className="col-sm-4 col-6 beer-card-container">
             <a href="#" onClick={()=>{this.props.handleClick(this.props.id)}}>
               <div className="col-12 beer-card">
                 <div className="pic-container">
                     <img className="card-pic" src={this.props.img} alt={`${this.props.title} from Brewdog`}/>
                 </div>
                 <h1 className="card-title">{this.props.title}</h1>
                 <div className="card-description">
                   <span className="">{this.props.description}</span>
                 </div>
                 <span className="subtitle">{`EBC: ${this.props.ebc}`}</span><br/>
                 <span className="subtitle">{`IBU: ${this.props.ibu}`}</span>
               </div>
             </a>
           </div>
       )      
   }  
}

export default BeerCard


