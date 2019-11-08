import React from "react"

function TitleIcon(props){
  const styles = {
    div: {
      marginRight: "0.75rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#B0BEC5",
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      boxShadow: "inset 0 0 0 2px #90A4AE"
    },
    span: {
      display: "block",
      height: "28px",
      width: "28px",
      margin: "0 auto"
    },
    image: {
      display: "block",
      maxHeight: "28px",
      maxWidth: "28px"
    }
  }
  const getSrc = (props) => {
    const urls = {
      Characteristics: "https://cdn.glitch.com/a6995824-3f64-4c6d-be04-a4911db726c3%2FGroup%2026.png?v=1573066617804",
      Hops: "https://cdn.glitch.com/a6995824-3f64-4c6d-be04-a4911db726c3%2FGroup%2017.png?v=1573068032131",
      FoodPairing: "https://cdn.glitch.com/a6995824-3f64-4c6d-be04-a4911db726c3%2FGroup%2024.png?v=1573067503899",
      Yeast: "https://cdn.glitch.com/a6995824-3f64-4c6d-be04-a4911db726c3%2FGroup%2027.png?v=1573067508842",
      Malts: "https://cdn.glitch.com/a6995824-3f64-4c6d-be04-a4911db726c3%2FGroup%2020.png?v=1573068353249"
    }
    return urls[props.alt]
  }
  const src = getSrc(props)
  
  return (
    <div style={styles.div}>
      <span style={styles.span}>
        <img
          src={src}
          alt={props.alt + " icon"}
          className="img-fluid"
          style={styles.image}/>
      </span>
    </div>
  )
}

export default TitleIcon