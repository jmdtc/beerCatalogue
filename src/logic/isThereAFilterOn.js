const isThereAFilterOn = (filters, ebcRange, ibuRange) => {
  if (filters.foodPairing.length > 0 || filters.hops.length > 0 || filters.searchString.length > 0) return true
  else if (((filters.ebc[0] !== ebcRange[0])&&(filters.ebc.length > 0)) ||
           ((filters.ebc[1] !== ebcRange[1])&&(filters.ebc.length > 0))) {
    return true
  }
  else if (((filters.ibu[0] !== ibuRange[0])&&(filters.ibu.length > 0)) ||
           ((filters.ibu[1] !== ibuRange[1])&&(filters.ibu.length > 0))) {
    return true
  }
  return false
}

export default isThereAFilterOn