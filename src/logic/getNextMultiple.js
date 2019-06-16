const getNextMultiple = (multiple, number) => {
  const rest = number % multiple
  if(!rest) {
    return number + multiple
  }
  else {
    return (multiple - rest) + number
  }
}

export default getNextMultiple