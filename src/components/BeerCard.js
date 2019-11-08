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
     const styles = {
       titleDiv: {
         whiteSpace: "nowrap",
         overflow: "hidden",
         textOverflow: "ellipsis"
       },
       h1: {
         fontSize: "1.5rem"
       },
       imageContainer: {
         backgroundColor: "#D4DEED",
         borderRadius: "10px 10px 2px 2px"
       },
       card: {
         padding: "25px"
       },
       spans: {
         overflow: "hidden"
       }
     }
     const beerImg = this.props.img ? this.props.img : "https://cdn.glitch.com/a6995824-3f64-4c6d-be04-a4911db726c3%2FGroup%2012.jpg?v=1572542817899"
     
       return (
           <div className="col-sm-4 beer-card-container">
             <a href="#" onClick={()=>{this.props.handleClick(this.props.id)}}>
               <div className="col-12 beer-card" style={styles.card}>
                 <div className="pic-container mb-3 py-3" style={styles.imageContainer}>
                     <img className="card-pic" src={beerImg} alt={`${this.props.title} from Brewdog`}/>
                 </div>
                 <div style={styles.titleDiv}>
                   <h1 className="card-title" style={styles.h1}>{this.props.title}</h1>
                 </div>
                 <div className="card-description mb-3">
                   <p className="">{this.props.description}</p>
                 </div>
                 <div style={styles.spans}>
                   <span className="subtitle"><strong>EBC: </strong>{this.props.ebc}</span>
                   <span className="subtitle"><strong>IBU: </strong>{this.props.ibu}</span>
                   <span className="subtitle"><strong>Hops: </strong>{hopsSpan}</span>
                 </div>
               </div>
             </a>
           </div>
       )      
   }  
}

export default BeerCard


