export default function filterBeers(beers, filters) {
  if (beers.length < 1) return
  const {size, hops, ebc, ibu, searchString} = filters
  const filteredBySearch = searchString.length > 0 ? filterBySearchString(beers, searchString) : beers
  const filteredByEbc = ebc.length > 0 ? filterByRange(filteredBySearch, ebc, "ebc") : filteredBySearch
  const filteredByIbu = ibu.length > 0 ? filterByRange(filteredByEbc, ibu, "ibu") : filteredByEbc
  return filteredByIbu
}

const filterBySearchString = (beers, searchString) => {
  const filteredBeers =
        beers.filter(beer =>
                     beer.name.toLowerCase().includes(searchString.toLowerCase()))
  return filteredBeers
}

const filterByRange = (beers, range, dimension, max) => {
  const filteredBeers =
        beers.filter(beer =>
                     beer[dimension] >= range[0] && beer[dimension] <= range[1])
  return filteredBeers
}