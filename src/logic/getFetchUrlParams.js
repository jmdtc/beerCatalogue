const getFetchUrlParams = (filtersValues, rangeLimits, pageNumber) => {
      const replaceSpacesWithUnderscores = (string) => {
        let stringWithUnderscores = ""
        for (var i = 0; i < string.length; i++) {
          string[i] === " " ? stringWithUnderscores += "_" : stringWithUnderscores += string[i]
        }
        return stringWithUnderscores
      }

      const foodString =  "food=" + replaceSpacesWithUnderscores(filtersValues.foodPairing)
      const {ebc, ibu} = filtersValues
      const nameString = replaceSpacesWithUnderscores(filtersValues.searchString)
      
      let urlParameters = "?"
      if (filtersValues.foodPairing.length > 0) {
        urlParameters += foodString
      }
      if ((ebc[0] !== rangeLimits.ebcRange[0])&&(ebc.length > 0)) {
        urlParameters[urlParameters.length-1] !== "?" ?
        urlParameters += ("&ebc_gt=" + ebc[0]) :
        urlParameters += ("ebc_gt=" + ebc[0])
      }
      if ((ebc[1] !== rangeLimits.ebcRange[1])&&(ebc.length > 0)) {
        urlParameters[urlParameters.length-1] !== "?" ?
        urlParameters += ("&ebc_lt=" + ebc[1]) :
        urlParameters += ("ebc_lt=" + ebc[1])
      }
      if ((ibu[0] !== rangeLimits.ibuRange[0])&&(ibu.length > 0)) {
        urlParameters[urlParameters.length-1] !== "?" ?
        urlParameters += ("&ibu_gt=" + ibu[0]) :
        urlParameters += ("ibu_gt=" + ibu[0])
      }
      if ((ibu[1] !== rangeLimits.ibuRange[1])&&(ibu.length > 0)) {
        urlParameters[urlParameters.length-1] !== "?" ?
        urlParameters += ("&ibu_lt=" + ibu[1]) :
        urlParameters += ("ibu_lt=" + ibu[1])
      }
      if (nameString.length > 0) {
        urlParameters[urlParameters.length-1] !== "?" ?
        urlParameters += ("&name=" + nameString) : 
        urlParameters += ("name=" + nameString)
      }
      if(urlParameters === "?") {
        return "https://api.punkapi.com/v2/beers?per_page=12&page=" + pageNumber
      }
      return "https://api.punkapi.com/v2/beers"+ urlParameters
}

export default getFetchUrlParams