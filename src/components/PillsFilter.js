import React, {Component} from "react"
import Pill from "./Pill"
import ExpandedFilterButtons from "./ExpandedFilterButtons"
import hopsData from "../datas/hopsData"

class PillsFilter extends Component {
  constructor() {
    super()
    this.state = {
      displayMore: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick() {
    this.setState({displayMore: true})
  }
  
  render() {
    const styles = {
      pillsBox: {
        maxHeight: "350px",
        width: "auto",
        overflowY: "auto",
      },
      pillHolderBasic: {
        display: "flex",
        alignContent: "flex-start",
        flexWrap: "wrap",
        width: "500px",
      },
      pillHolder: {
        display: "flex",
        alignContent: "flex-start",
        flexWrap: "wrap",
        width: "500px",
        paddingBottom: "24px",
      },
      title: {
        display: "block",
        paddingBottom: "8px",
        fontWeight: 600
      },
      span: {
        fontSize: "14px",
        color: "#2196F3",
      },
      moreHolder: {
        display: "inline-block",
        paddingTop: "8px",
      }
    }
    
    const isPillSelected = (hop) => {
      const {value} = this.props.filterProps
      for (const el of value) {
        if(el.id === hop.id) {
          return <Pill
                   name={hop.name}
                   id={hop.id}
                   key={hop.id}
                   handlePillClick={this.props.handlePillClick}
                   clicked={true}/>
        }
      }
      return <Pill
                 name={hop.name}
                 id={hop.id}
                 key={hop.id}
                 handlePillClick={this.props.handlePillClick}
                 clicked={false}/>
    }
    const pills = hopsData.filter(hop => hop.id <= 20)
                          .map(isPillSelected)
    const morePills = hopsData.filter(hop => hop.id > 20)
                          .map(isPillSelected)
    const morePillsBlock = <div>
                             <span style={styles.title}>Other hops</span>
                             <div className="pill-holder" style={styles.pillHolder}>
                               {morePills}
                             </div>
                           </div>
    const moreButtonDiv = <a
                            style={styles.moreHolder}
                            href="#"
                            className="more-hops"
                            onClick={this.handleClick}>
                            <span style={styles.span}>More hops</span>
                          </a>
    const pillHolderStyle = this.state.displayMore ? styles.pillHolder : styles.pillHolderBasic
                               
    return (
      <div className="expanded-button expanded-hops">
        <div style={styles.pillsBox} className="pills-box">
          <span style={styles.title}>Most used hops</span>
          <div className="pill-holder" style={pillHolderStyle}>
            {pills}
          </div>
          {!this.state.displayMore && moreButtonDiv}
          {this.state.displayMore && morePillsBlock}
        </div>
        <ExpandedFilterButtons
          filter={this.props.filterProps}
          clearValue={this.props.clearValue}
          handleApplyButton={this.props.handleApplyButton}/>
      </div>
    )
  }
}

export default PillsFilter
