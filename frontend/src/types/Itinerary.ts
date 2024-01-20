export interface Itinerary {
  title: String
  budget: number
  country: Country
  id: number
  userId: number
  itineraryDestinations: ItineraryDestinations[]
}

export interface ItineraryDestinations {
  id: number
  itineraryId: number
  destination: Destination
}

export type Country = {
  id: number
  name: string
}

export type Destination = {
  id: number
  countryId: number
  name: string
  cost: number
  notes: string
}
