import React from "react"
import BeerPage  from "../components/BeerPage"

export default function createBeerPage(beers, id, handleClick) {
  if (beers.length < 1 || !id) return  
  const beer = beers[id-1]
  const beerPage = <BeerPage
                     name={beer.name}
                     tagline={beer.tagline}
                     description={beer.description}
                     handleClick={handleClick}
                   />
  return beerPage
}