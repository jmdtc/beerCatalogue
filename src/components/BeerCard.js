import React, {Component} from "react"

class BeerCard extends Component {
  
   render()  {
     const hops = this.props.hops
     let hopsSpan = ""
     let i = 1
     for (const hop of hops) {
       i++
       if (i <= hops.length) {
         hopsSpan += hop + ", "
       }
       else {
         hopsSpan += hop
       }
     }
           
       return (
           <div className="col-sm-4 col-6 beer-card-container">
             <a href="#" onClick={()=>{this.props.handleClick(this.props.id)}}>
               <div className="col-12 beer-card">
                 <div className="pic-container">
                     <img className="card-pic" src={this.props.img} alt={`${this.props.title} from Brewdog`}/>
                 </div>
                 <h1 className="card-title">{this.props.title}</h1>
                 <div className="card-description mb-3">
                   <span className="">{this.props.description}</span>
                 </div>
                 <span className="subtitle">{`EBC: ${this.props.ebc}`}</span>
                 <span className="subtitle">{`IBU: ${this.props.ibu}`}</span>
                 <span className="subtitle">{`Hops: ${hopsSpan}`}</span>
               </div>
             </a>
           </div>
       )      
   }  
}

export default BeerCard


