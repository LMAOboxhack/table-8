import type { User } from './User'

export interface ItineraryDestinations {
  id: number
  itinerary: Itinerary
  destination: Destination
}

export interface Itinerary {
  title: String
  budget: number
  country: Country
  id: number
  user: User
  itineraryDestinations: ItineraryDestinations[]
}

export type Destination = {
  id: number
  countryId: number
  name: string
  cost: number
  notes: string
}

export type Country = {
  id: number
  name: string
}
