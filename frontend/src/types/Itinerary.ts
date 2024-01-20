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
  id?: number
  user?: User
  destinations: Destination[]
}

export type Destination = {
  id?: number
  country_id?: number
  country?: Country
  name: string
  cost?: number
  notes?: string
}

export type Country = {
  id?: number
  name: string
}
