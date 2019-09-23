const filterBySearchString = (beers, searchString) => {
  const filteredBeers =
        beers.filter(beer =>
                     beer.name.toLowerCase().includes(searchString.toLowerCase()))
  return filteredBeers
}

const filterByHops = (beers, hops) => {
  const containsHop = (hopElement) => {
    for (const item of hops) {
      if (hopElement.name === item.name)
        return true
    }
    return false
  }
  
  const filteredBeers = 
         beers.filter(beer => beer.ingredients.hops.some(containsHop))
  return filteredBeers
}

const filterByRange = (beers, range, dimension, max) => {
  const updatedRange = range[1] === max ? [range[0], 100000] : range
  const filteredBeers =
        beers.filter(beer =>
                     beer[dimension] >= updatedRange[0] && beer[dimension] <= updatedRange[1])
  return filteredBeers
}

const filterByFoodPairing = (beers, foodPairing) => {
  const containsFoodPairing = (string) => {
    for (const item of foodPairing) {
      const {text} = item
      const newText = text[text.length - 1].toLowerCase() === "s" ? text.slice(0, -1) : text
      if (string.toLowerCase().includes(newText.toLowerCase())) {
        return true
      }
      return false
    }
  }
  const filteredBeers = beers.filter(beer => beer.food_pairing.some(containsFoodPairing))
  return filteredBeers
}


export default function filterBeers(beers, filters) {
  if (beers.length < 1) return
  const {foodPairing, hops, ebc, ibu, searchString} = filters
  const filteredByName = searchString.length > 0 ? filterBySearchString(beers, searchString) : beers
  const filteredByFoodPairing = foodPairing.length > 0 ? filterByFoodPairing(filteredByName, foodPairing) : filteredByName
  const filteredByHops = hops.length > 0 ? filterByHops(filteredByFoodPairing, hops) : filteredByFoodPairing
  const filteredByEbc = ebc.length > 0 ? filterByRange(filteredByHops, ebc, "ebc", 60) : filteredByHops
  const filteredByIbu = ibu.length > 0 ? filterByRange(filteredByEbc, ibu, "ibu", 140) : filteredByEbc
  return filteredByIbu
}
