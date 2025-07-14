import type { Product } from "@/types/product"
import { mockProductData } from "@/constants/mockData"

export const parseProductUrl = (
  url: string,
): Omit<Product, "id" | "customName" | "position" | "size" | "rotation" | "zIndex"> | null => {
  const cleanUrl = url.replace(/https?:\/\//, "").replace(/www\./, "")

  if (mockProductData[cleanUrl]) {
    return mockProductData[cleanUrl]
  }

  for (const [key, data] of Object.entries(mockProductData)) {
    if (cleanUrl.includes(key.split("/")[0])) {
      return {
        ...data,
        url: cleanUrl,
        title: `Product from ${data.site}`,
        price: Math.floor(Math.random() * 100) + 10,
      }
    }
  }

  const site = cleanUrl.split("/")[0].split(".")[0]
  return {
    url: cleanUrl,
    title: `Product from ${site}`,
    price: Math.floor(Math.random() * 100) + 10,
    currency: "USD",
    image: "/placeholder.svg?height=200&width=200",
    site: site.charAt(0).toUpperCase() + site.slice(1),
  }
}
