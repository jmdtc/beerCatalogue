import React from "react"
import BeerPage  from "../components/BeerPage"

export default function createBeerPage(beers, id, handleClick) {
  if (beers.length < 1 || !id) return  
  const beer = beers[id-1]
  const beerPage = <BeerPage
                     name={beer.name}
                     tagline={beer.tagline}
                     description={beer.description}
                     brewersTips={beer.brewers_tips}
                     image={beer.image_url}
                     foodPairing={beer.food_pairing}
                     ibu={beer.ibu}
                     ebc={beer.ebc}
                     ingredients={beer.ingredients}
                     handleClick={handleClick}
                   />
  return beerPage
}