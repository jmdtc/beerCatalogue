const getTrackStyle = (min, max) => {
      const getMinColor = (min) => {
        let minColor = ""
        if (min < 16) {
          minColor = "rgba(248,247,83,1) 0%, "
        }
        else if (min < 26 && min >= 16) {
          minColor = "rgba(213,188,38,1) 0%, "
        }
        else if (min < 45 && min >= 26) {
          minColor = "rgba(188,103,51,1) 0%, "
        }
        else if (min < 60 && min >= 45) {
          minColor = "rgba(38,23,22,1) 0%, "
        }
        return minColor
      }    
      const getMaxColor = (max) => {
        let maxColor = ""
        if (max > 45) {
          maxColor = "rgba(3,4,3,1) 100%)"
        }
        else if (max > 26 && max <= 45) {
          maxColor = "rgba(38,23,22,1) 100%)"
        }
        else if (max > 16 && max <= 26) {
          maxColor = "rgba(188,103,51,1) 100%)"
        }
        else if (max > 0 && max <= 16) {
          maxColor = "rgba(230,216,60,1) 100%)"
        }
        return maxColor
      }
      
      const getMiddleColors = (min, max) => {
        const pBuilder = (p) => {
          return p + "%, "
        }
        
        let middleColors = ""
        const wheatC= "rgba(213,188,38,1)"
        const wheatP = 16
        const amberC = "rgba(188,103,51,1)"
        const amberP = 26
        const darkC = "rgba(38,23,22,1)"
        const darkP = 45
        const numberOfActiveDots = max - min
        if (min < 16 && max > 45) {
          const colorOneA = (wheatP - min) / 2
          const colorFiveA = (max - darkP) / 2
          const colorTwoA = colorOneA + ((amberP - wheatP) / 2)
          const colorThreeA = ((amberP- wheatP)/2) + ((darkP - amberP)/2)
          const colorFourA = colorFiveA + ((darkP - amberP) / 2)
          const colorTwoP = (colorTwoA / numberOfActiveDots) * 100
          const colorThreeP = (colorThreeA / numberOfActiveDots) * 100
          const colorFourP = (colorFourA / numberOfActiveDots) * 100
          middleColors = wheatC + pBuilder(colorTwoP) +
            amberC + pBuilder(colorThreeP + colorTwoP) +
            darkC + pBuilder(colorFourP + colorThreeP + colorTwoP)
        }
        else if (((min < 26 && min >= 16) && max > 45)) {
          const colorTwoA = (amberP - min) / 2
          const colorFiveA = (max - darkP) / 2
          const colorThreeA = colorTwoA + ((darkP - amberP) / 2)
          const colorFourA = colorFiveA + ((darkP - amberP) / 2)
          const colorThreeP = (colorThreeA / numberOfActiveDots) * 100
          const colorFourP = (colorFourA / numberOfActiveDots) * 100
          middleColors = amberC + pBuilder(colorThreeP) + darkC + pBuilder(colorFourP + colorThreeP)
        }
        else if ((min < 45 && min >= 26) && max > 45) {
          const colorThreeA = (darkP - min) / 2
          const colorThreeP = (colorThreeA / numberOfActiveDots) * 100
          middleColors = darkC + pBuilder(colorThreeP + 50)
        }
        else if (min < 16 && (max <= 45 && max > 26)) {
          const colorOneA = (wheatP - min) / 2
          const colorFourA = (darkP - max) / 2
          const colorTwoA = colorOneA + ((amberP - wheatP) / 2)
          const colorThreeA = colorFourA + ((darkP - amberP) / 2)
          const colorTwoP = (colorTwoA / numberOfActiveDots) * 100
          const colorThreeP = (colorThreeA / numberOfActiveDots) * 100
          middleColors = wheatC + pBuilder(colorTwoP) + amberC + pBuilder(colorThreeP + colorTwoP + 15)
        }
        else if (min >= 16 && max <= 45) {
          const diff = max - min
          const number = (diff *(-5 / 3) + 100)
          middleColors = amberC + pBuilder(number) 
        }
        if (min <= 6 && max <= 26) {
          const p = 35 + ((25 - max) * 4)
          middleColors = wheatC + pBuilder(p)
        }
        return middleColors
      }
      
      const base = "linear-gradient(90deg, "
      const minColor = getMinColor(min)
      const maxColor = getMaxColor(max)
      const middleColors = getMiddleColors(min, max)
      const gradient = base + minColor + middleColors + maxColor
      return [{background: gradient}] 
    }

export default getTrackStyle