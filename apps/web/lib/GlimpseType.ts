export interface Glimpse {
  id: string
  slug: string
  content: string
  secret: string | null
  lifetime: Date
  thumb: string
}
