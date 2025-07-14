export interface Product {
  id: string
  url: string
  title: string
  customName: string
  price: number
  currency: string
  image: string
  site: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
  zIndex: number
}

export interface CurrencyRate {
  [key: string]: number
}

export interface DragState {
  isDragging: boolean
  dragOffset: { x: number; y: number }
  productId: string | null
}

export interface Currency {
  code: string
  symbol: string
  name: string
}
