import React, {Component} from "react"
import BeerCharacteristicsRow from "./BeerCharacteristicsRow"
import FoodPairingRow from "./FoodPairingRow"

class BeerPage extends Component {
   constructor() {
     super()
     this.state = {
       deviceWidth: window.innerWidth,
       deviceHeight: window.innerHeight,
       contentToTop: 0,
       backButtonToTop: 0
     }
   }
  
   componentDidMount() {
     if (window.innerWidth < 992) return //small optimisation for mobile, avoid unnecessery rerender
     window.scroll(0,0)
     
     const contentPosTop = document.querySelector(".content").getBoundingClientRect().top 
     const backButtonPosTop = document.querySelector("#main").getBoundingClientRect().top

     this.setState({
                    contentToTop: contentPosTop,
                    backButtonToTop: backButtonPosTop})
   }
  
   render()  {
     const calculateContainersHeight = (viewportHeight) => {
       if (viewportHeight >= 600 && viewportHeight <= 1000) {
         const startingNumber = 90
         const finalNumber = startingNumber - ((viewportHeight - 600) * 0.05)
         return finalNumber + "%"
       }
       else if (viewportHeight < 600) {
         return "90%"
       }
       return "70%"
     }

     const styles = {
       titlesContainer: {
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         height: this.state.deviceWidth >= 992 ? calculateContainersHeight(this.state.deviceHeight) : "auto",
       },
       h1container: {

       },
       tagline: {
         fontWeight: "400",
         fontSize: "1,3125rem"
       },
       imageContainer: {
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         height: calculateContainersHeight(this.state.deviceHeight)
       },
       image: {
         maxHeight: "400px",
         margin: "0 auto",
         display: "block"
       },
       paragraph: {
         marginBottom: "2rem"
       },
       leftTilesDesktop: {
         maxHeight: this.state.deviceHeight - this.state.contentToTop - 10,
         position: "sticky",
         top: this.state.contentToTop
       },
       leftTilesMobile: {
         textAlign: "center"
       },
       goBackDesktop: {
         position: "sticky",
         top: this.state.backButtonToTop
       },
       goBackMobile: {

       },
       beerName: {
         fontWeight: "800",
         fontSize: "4.5rem",
         lineHeight: "1"
       },
       h3: {
         fontWeight: "600",
         fontSize: "18px"
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
         
      const truncateName = (str) => {
        const splitStr = str.split(" ")
        const nWords = splitStr.length 
        const nCharacters = str.length

        if (nWords > 4 || nCharacters > 25) {
          let result = ""
          for (let i = 0; i < 4; i++) {
            if (result.length + splitStr[i].length <= 25) {
              i < 3 ? result += splitStr[i] + " " : result += splitStr[i]
            }
          }
          return result + "..."
        }
        return str
      }
      
       const h1 = truncateName(this.props.name)
       
       const {ibu, ebc, ph} = this.props
       const {yeast} = this.props.ingredients
       const yeastFormatted = yeast.split(" - ")
       const yeastItems =
             yeastFormatted.length === 2 ?
             [{scale: yeastFormatted[0], value: yeastFormatted[1].replace("™", "")}] : 
             [{scale: "Yeast", value: yeast}]
       const mainCharacteristics = [{scale: "IBU", value: ibu || "-"},
                                    {scale: "EBC", value: ebc || "-"},
                                    {scale: "PH", value: ph || "-"}]
       const leftTilesStyle = this.state.deviceWidth >= 992 ? styles.leftTilesDesktop : styles.leftTilesMobile
       const goBackStyle = this.state.deviceWidth >= 992 ? styles.goBackDesktop : styles.goBackMobile
       const beerImg = this.props.image ? this.props.image : "https://cdn.glitch.com/a6995824-3f64-4c6d-be04-a4911db726c3%2FGroup%2014%20(1).jpg?v=1572603891338"

       return (
           <div>
             <div className="beer-page-container">
               <div className="row pt-2 go-back-row" style={goBackStyle}>
                 <div className="col-lg-6">
                   <button
                     className="go-back-button"
                     onClick={() => this.props.handleClick(0)}>
                     <i className="fas fa-arrow-left mr-2"></i>
                         Go back
                   </button>
                 </div>
               </div>
               
               <div className="row pt-4">
                 <div className="col-lg-3 content" style={leftTilesStyle}>
                   <div style={styles.titlesContainer}>
                     <div style={styles.h1container}>
                       <h1 style={styles.beerName}>{h1}</h1>
                     </div>
                     <h2 style={styles.tagline}>{this.props.tagline.replace(".","")}</h2>
                   </div>
                  </div>
                 
                  <div className="col-lg-4" style={leftTilesStyle}>
                   <div style={this.state.deviceWidth >= 992 ? styles.imageContainer : null}>
                     <img
                     src={beerImg}
                     alt={this.props.name + " Brewdog beer"}
                     className="img-fluid"
                     style={styles.image}/>
                   </div>
                  </div>
                 
                  <div className="col-lg-5 pt-4">
                   <h3 style={styles.h3}>Description</h3>
                   <p style={styles.paragraph}>{this.props.description}</p>
                   <h3 style={styles.h3}>Brewer's Tips</h3>
                   <p style={styles.paragraph}>{this.props.brewersTips}</p>
                   <BeerCharacteristicsRow
                     title="Characteristics"
                     items={mainCharacteristics}/>
                   <BeerCharacteristicsRow
                     title="Hops"
                     items={setIngredientsForProps(this.props.ingredients.hops)}/>
                   <BeerCharacteristicsRow
                     title="Malts"
                     items={setIngredientsForProps(this.props.ingredients.malt)}/>
                   <BeerCharacteristicsRow
                     title="Yeast"
                     items={yeastItems}/>
                   <FoodPairingRow food={this.props.foodPairing}/>
                  </div>
               </div>
             </div>
           </div>
       )      
   }  
}

export default BeerPage


