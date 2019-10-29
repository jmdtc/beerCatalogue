import React, {Component} from "react"
import BeerCharacteristicsRow from "./BeerCharacteristicsRow"
import FoodPairingRow from "./FoodPairingRow"

class BeerPage extends Component {
  
   render()  {
     const styles = {
       image: {
         height: "400px"
       }
     }
     
     const setIngredientsForProps = (hops) => {
       let hopsAmount = {}
       for (const el of hops) {
         const {name} = el
         Object.keys(hopsAmount).includes(name) ?
           hopsAmount[name].value += el.amount.value :
           hopsAmount[name] = el.amount
       }
       
       return hopsAmount
     }
     console.log(this.props)
       return (
           <div>
             <div className="beer-page-container">
               <div className="row">
                 <div className="col pt-2">
                   <button
                     className="go-back-button"
                     onClick={() => this.props.handleClick(0)}>
                     <i className="fas fa-arrow-left mr-2"></i>
                         Go back
                   </button>
                 </div>
               </div>
               <div className="row pt-4">
                 <div className="col-sm-5">
                 </div>
                 
                 <div className="col-sm-2">
                   <img
                     src={this.props.image}
                     alt={this.props.name + " Brewdog beer"}
                     className="img-fluid"
                     style={styles.image}/>
                 </div>
                 
                 <div className="col-sm-5">
                   <BeerCharacteristicsRow items={setIngredientsForProps(this.props.ingredients.hops)}/>
                   <BeerCharacteristicsRow items={setIngredientsForProps(this.props.ingredients.malt)}/>
                   <FoodPairingRow food={this.props.foodPairing}/>
                 </div>
               </div>
             </div>
           </div>
       )      
   }  
}

export default BeerPage


