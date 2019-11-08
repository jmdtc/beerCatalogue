import React, {Component} from "react"

class SearchFilter extends Component {
   constructor() {
     super()
     this.state = {
       value: "",
       focus: false,
     }
     this.handleChange = this.handleChange.bind(this)
     this.handleBlur= this.handleBlur.bind(this)
     this.clearValue = this.clearValue.bind(this)
   }
  
   handleChange(e) {
     const {value} = e.target
     this.setState({value: value})
   }
  
   clearValue() {
     this.setState({value:"", focus: false})
     
     if (!this.props.filterValue) return
     this.props.clearSearchFilter()
   }
  
   handleBlur() {
     this.setState({focus:false})
     if (!this.props.filterValue) return
     this.setState({value: this.props.filterValue})
   }
   
   render()  {
       const inputStyle = (this.props.filterValue && !this.state.focus) ? {
         borderRadius: "0px 4px 4px 0px",
         borderColor: "rgb(33, 150, 243)",
         backgroundColor:"#B3E5FC",
       } :
       {
         paddingLeft: "6px",
       }
       
       let glassStyle = {
         position: "relative",
         top: "-5px",
       }
       
       const clearCrossStyle = {
         display: "block",
         position: "absolute",
         paddingRight: "10px",
         zIndex: "100000",
         right: "0",
         top: "0",
         bottom: "0",
         lineHeight:"0.25",
         cursor: "pointer",
         color: "#757575"
       }
       
       const spanInputStyle = {
         position: "relative"
       }
       
       
       const clearCross = <i className="fas fa-times" style={clearCrossStyle} onClick={() => {this.clearValue()}}></i>
       const button =
             <button
               type="submit"
               name="searchButton"
               className="search-button">
               <i className="fa fa-search" style={glassStyle}></i>
             </button>
             
       const value =
             (this.props.filterValue && !this.state.focus) ?
             this.props.filterValue : this.state.value
       
       return (
           <div className="filter-button-holder search-bar">
             <form className="search-form" onSubmit={(e) => this.props.handleSubmit(e)} autoComplete="off">
               {button}
               <input
                 type='text'
                 placeholder="Search beer name" 
                 name="searchString"
                 className="search-input"
                 value={value}
                 style={inputStyle}
                 onChange={(e) => this.handleChange(e)}
                 onFocus={() => {this.setState({focus:true, value: this.props.filterValue})}}
                 onBlur={this.handleBlur}
                 />
               <span style={spanInputStyle}>{(this.state.value || this.props.filterValue) && clearCross}</span>
             </form>
           </div>
       )      
   }  
}

export default SearchFilter

