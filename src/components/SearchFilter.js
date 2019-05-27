import React, {Component} from "react"

class SearchFilter extends Component {
   constructor() {
     super()
     this.state = {
       value: ""
     }
     this.handleChange = this.handleChange.bind(this)
   }
  
   handleChange(e) {
     const {value} = e.target
     this.setState({value: value})
   }
  
   
   render()  {
       const inputStyle= {
         paddingLeft: "5px",
       }
       
       const glassStyle = {
         position: "relative",
         top: "-2px",
       }
       
       return (
           <div className="filter-button-holder search-bar">
             <form className="search-form" onSubmit={(e) => this.props.handleSubmit(e)}>
               <input
                 type='text'
                 placeholder='Search for beer name'
                 name="searchString"
                 className="search-input"
                 value={this.state.value}
                 style={inputStyle}
                 onChange={(e) => this.handleChange(e)}/>
               <button
                 type="submit"
                 name="searchButton"
                 className="search-button">
                 <i className="fa fa-search" style={glassStyle}></i>
               </button>
             </form>
           </div>
       )      
   }  
}

export default SearchFilter


