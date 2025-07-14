import { Globe } from "lucide-react"
import { convertPrice, formatPrice } from "@/utils/currency"
import type { Product } from "@/types/product"

interface PriceTagProps {
  product: Product
  preferredCurrency: string
  rotation: number
}

export function PriceTag({ product, preferredCurrency, rotation }: PriceTagProps) {
  const convertedPrice = convertPrice(product.price, product.currency, preferredCurrency)
  const originalFormatted = formatPrice(product.price, product.currency)
  const convertedFormatted = formatPrice(convertedPrice, preferredCurrency)

  return (
    <div
      className="absolute bg-white rounded-full shadow-lg border-2 border-blue-100 px-3 py-1 min-w-max"
      style={{
        top: -10,
        right: -15,
        transform: `rotate(${-rotation}deg)`,
      }}
    >
      <div className="text-center">
        <p className="font-bold text-sm text-blue-600">{convertedFormatted}</p>
        {product.currency !== preferredCurrency && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
            <Globe className="h-2 w-2" />
            {originalFormatted}
          </p>
        )}
      </div>
    </div>
  )
}
