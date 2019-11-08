import React from "react"
import BeerPage  from "../components/BeerPage"

export default function createBeerPage(beers, id, handleClick) {
  if (beers.length < 1 || !id) return  
  const beer = beers.find(beer => beer.id === id)
  const beerPage = <BeerPage
                     name={beer.name}
                     tagline={beer.tagline}
                     description={beer.description}
                     brewersTips={beer.brewers_tips}
                     image={beer.image_url}
                     foodPairing={beer.food_pairing}
                     ibu={beer.ibu}
                     ebc={beer.ebc}
                     ph={beer.ph}
                     ingredients={beer.ingredients}
                     handleClick={handleClick}
                   />
  return beerPage
}