"use client"

import { Calculator, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { currencies } from "@/constants/currencies"
import { convertPrice, formatPrice } from "@/utils/currency"
import type { Product } from "@/types/product"

interface BillSidebarProps {
  products: Product[]
  preferredCurrency: string
  setPreferredCurrency: (currency: string) => void
  onResetLayout: () => void
}

export function BillSidebar({ products, preferredCurrency, setPreferredCurrency, onResetLayout }: BillSidebarProps) {
  const getTotalPrice = (): number => {
    return products.reduce((total, product) => {
      return total + convertPrice(product.price, product.currency, preferredCurrency)
    }, 0)
  }

  return (
    <div className="w-80 border-l bg-muted/30 p-6 flex flex-col h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Shopping Bill</h2>
      </div>

      <div className="mb-4">
        <Label htmlFor="currency-select" className="text-sm font-medium">
          Preferred Currency
        </Label>
        <Select value={preferredCurrency} onValueChange={setPreferredCurrency}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.symbol} {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={onResetLayout} variant="outline" size="sm" className="flex-1 bg-transparent">
          <RotateCcw className="h-4 w-4 mr-1" />
          Shuffle
        </Button>
      </div>

      <Separator className="my-4" />

      <ScrollArea className="flex-1 min-h-0 mb-4">
        <div className="space-y-3">
          {products.map((product) => {
            const convertedPrice = convertPrice(product.price, product.currency, preferredCurrency)
            const originalFormatted = formatPrice(product.price, product.currency)
            const convertedFormatted = formatPrice(convertedPrice, preferredCurrency)

            return (
              <div key={product.id} className="flex justify-between items-start text-sm">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.customName}</p>
                  <p className="text-muted-foreground text-xs">{product.site}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="font-medium">{convertedFormatted}</p>
                  {product.currency !== preferredCurrency && (
                    <p className="text-xs text-muted-foreground">{originalFormatted}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <Separator className="my-4" />

      <div className="flex flex-col gap-1 sticky bottom-0 bg-muted/30 pt-2 pb-4 -mx-6 px-6">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span>{formatPrice(getTotalPrice(), preferredCurrency)}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {products.length} item{products.length !== 1 ? "s" : ""} in your moodboard
        </p>
      </div>
    </div>
  )
}
