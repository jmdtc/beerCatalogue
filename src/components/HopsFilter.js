import React, {Component} from "react"
import HopPill from "./HopPill"
import hopsData from "../datas/hopsData"

class HopsFilter extends Component {
  constructor() {
    super()
    this.state = {
      searchString: "",
      activeHops: []
    }
    this.handleStringChange = this.handleStringChange.bind(this)
    this.handlePillClick = this.handlePillClick.bind(this)
  }
  
  handleStringChange(e) {
    const {value} = e.target
    this.setState({searchString: value})
  }
  
  handlePillClick(id) {
    const clickedPill = hopsData.find(hop => hop.id === id)
    if (this.state.activeHops.some(hop => hop === clickedPill)) return
    
    this.setState(prevState => {
      const updatedHops = prevState.activeHops
      updatedHops.push(clickedPill)
      return {activeHops: updatedHops}
    })
  }

  render() {
    const styles = {
      input: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "6px",
      },
      filterWrapper: {
        height: "400px",
        paddingTop: "16px",
        width: "220px",
      },
      inputWrapper: {
        height: "30px",
        marginBottom: "6px",
        backgroundColor: "white",
      },
      pillsListDefault: {
        height: "",
        overflow: "auto",
      },
      selectedPill : {
       margin: "auto",
      },
      selectedPillsList : {
      },
    }
    const containerHeight = parseInt(styles.filterWrapper.height, 10) - parseInt(styles.filterWrapper.paddingTop, 10)
    const inputHeight = parseInt(styles.inputWrapper.marginBottom, 10) + parseInt(styles.inputWrapper.height, 10)
    const pillsListHeight = containerHeight - inputHeight - 12
    styles.pillsListDefault.height = pillsListHeight + "px"

    
    const hops = hopsData
    const hopPills = hops.filter(hops => !this.state.activeHops.some(activeHop => activeHop.id === hops.id) &&
                                         hops.name.toLowerCase().includes(this.state.searchString.toLowerCase()))
                         .map(hop => {return <HopPill
                                               text={hop.name}
                                               id={hop.id}
                                               key={hop.id}
                                               selected={false}
                                               handlePillClick={this.handlePillClick}/>
                                     })

    const selectedHops = this.state.activeHops
    const selectedPills = selectedHops.map(selectedHop => {return <HopPill
                                                                    text={selectedHop.name}
                                                                    id={selectedHop.id}
                                                                    key={selectedHop.id}
                                                                    selected={true}
                                                                    handlePillClick={this.handlePillClick}
                                                                    class="selected-pill"/>    
                                                          })
    
    if (selectedPills.length > 0) {
      const height = parseInt(styles.filterWrapper.height, 10) + (selectedPills.length * 42) + "px"
      styles.filterWrapper.height = height
    }   
    
    return(      
      <div style={styles.filterWrapper}>
        <div style={styles.inputWrapper}><input
                                           type="text"
                                           style={styles.input}
                                           value={this.state.searchString}
                                           onChange={(e) => this.handleStringChange(e)}
                                           placeholder="Search hops"
                                           />
        </div>
        <div style={styles.pillsListDefault} className="hops-list-wrapper">{hopPills}</div>
        {selectedHops.length > 0 && <div style={styles.selectedPillsList}>{selectedPills}</div>}
      </div>
    )
  }
}

export default HopsFilter

