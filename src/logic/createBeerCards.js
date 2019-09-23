import React from "react"
import BeerCard  from "../components/BeerCard"
import filterBeers  from "../logic/filterBeers"

export default function createBeerCards(beers, handleClick, filters) {
  if (beers.length < 1) return
  beers = filterBeers(beers, filters)
  let beerCards = []
  beerCards = beers.map(beer => {
      const hops = []
      for (const hop of beer.ingredients.hops) {
        if (!hops.includes(hop.name)) {
          hops.push(hop.name)
        }
      }

      return <BeerCard
              key={beer.id}
              id={beer.id}
              img={beer.image_url}
              title={beer.name}
              description={beer.description}
              ibu={beer.ibu}
              ebc={beer.ebc}
              hops={hops}
              handleClick={handleClick}
      />
  })
  return beerCards
}