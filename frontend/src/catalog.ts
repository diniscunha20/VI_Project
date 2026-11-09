export type Recommendation = 'Best' | 'Recommended' | 'NotRecommended' | null

export type EventGame = {
  id: string
  name: string
  theme: string
  minutes: number
  weight: number
  rating: number
  recommendations: Recommendation[]
}

export type GameProfile = {
  id: string
  name: string
  values: number[]
  players: string
}

export type Catalog = {
  eventGames: EventGame[]
  profiles: GameProfile[]
}
