import type { CurrencyRate, Product } from "@/types/product"

export const mockCurrencyRates: CurrencyRate = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  LKR: 325.5,
  INR: 83.25,
  JPY: 149.5,
  CAD: 1.35,
  AUD: 1.52,
}

export const mockProductData: {
  [key: string]: Omit<Product, "id" | "customName" | "position" | "size" | "rotation" | "zIndex">
} = {
  "amazon.com/dp/B08N5WRWNW": {
    url: "amazon.com/dp/B08N5WRWNW",
    title: "Echo Dot (4th Gen) Smart Speaker",
    price: 49.99,
    currency: "USD",
    image: "/placeholder.svg?height=200&width=200",
    site: "Amazon",
  },
  "aliexpress.com/item/1005003842615": {
    url: "aliexpress.com/item/1005003842615",
    title: "Aesthetic LED Strip Lights",
    price: 15.99,
    currency: "USD",
    image: "/placeholder.svg?height=200&width=200",
    site: "AliExpress",
  },
  "etsy.com/listing/1234567890": {
    url: "etsy.com/listing/1234567890",
    title: "Handmade Ceramic Mug",
    price: 28.5,
    currency: "USD",
    image: "/placeholder.svg?height=200&width=200",
    site: "Etsy",
  },
}
