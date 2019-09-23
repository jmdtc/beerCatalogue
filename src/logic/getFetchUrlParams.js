const getFetchUrlParams = (filtersValues, rangeLimits, pageNumber) => {
      const replaceSpacesWithUnderscores = (string) => {
        let stringWithUnderscores = ""
        for (let i = 0; i < string.length; i++) {
          string[i] === " " ? stringWithUnderscores += "_" : stringWithUnderscores += string[i]
        }
        return stringWithUnderscores
      }

      const {ebc, ibu, foodPairing, hops} = filtersValues
      const nameString = replaceSpacesWithUnderscores(filtersValues.searchString)
      const arrayOfUrl = []
      const urlBase = "https://api.punkapi.com/v2/beers"
      
      let urlParameters = "?"
      if (foodPairing.length > 0 || hops.length > 0 ) {
        for (const item of foodPairing) {
          const url = urlBase + "?food=" + replaceSpacesWithUnderscores(item.text)
          arrayOfUrl.push(url.toLowerCase())
        }
        for (const item of hops) {
          const url = urlBase + "?hops=" + replaceSpacesWithUnderscores(item.name)
          arrayOfUrl.push(url.toLowerCase())
        }
        return arrayOfUrl
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
        arrayOfUrl.push(urlBase + "?per_page=12&page=" + pageNumber)
        return arrayOfUrl
      }
      for (let i=1; i < 10 ; i++) {
        arrayOfUrl.push(urlBase + urlParameters + "&per_page=80&page=" + i)
      }
      return arrayOfUrl
}

export default getFetchUrlParams