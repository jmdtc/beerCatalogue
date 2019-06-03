const filterBySearchString = (beers, searchString) => {
  const filteredBeers =
        beers.filter(beer =>
                     beer.name.toLowerCase().includes(searchString.toLowerCase()))
  return filteredBeers
}

const filterByRange = (beers, range, dimension, max) => {
  const updatedRange = range[1] === max ? [range[0], 100000] : range
  const filteredBeers =
        beers.filter(beer =>
                     beer[dimension] >= updatedRange[0] && beer[dimension] <= updatedRange[1])
  return filteredBeers
}

export default function filterBeers(beers, filters) {
  if (beers.length < 1) return
  const {size, hops, ebc, ibu, searchString} = filters
  const filteredBySearch = searchString.length > 0 ? filterBySearchString(beers, searchString) : beers
  const filteredByEbc = ebc.length > 0 ? filterByRange(filteredBySearch, ebc, "ebc", 60) : filteredBySearch
  const filteredByIbu = ibu.length > 0 ? filterByRange(filteredByEbc, ibu, "ibu", 140) : filteredByEbc
  return filteredByIbu
}
