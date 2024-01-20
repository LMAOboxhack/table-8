export type Itinerary = {
  title: String
  budget: number
  country: string
  destinations: Destination[]
}

type Destination = {
  name: string
  cost: number
  notes: number
  id: number
  countryId: number
}
