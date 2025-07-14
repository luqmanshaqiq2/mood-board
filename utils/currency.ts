import { mockCurrencyRates } from "@/constants/mockData"
import { currencies } from "@/constants/currencies"

export const convertPrice = (price: number, fromCurrency: string, toCurrency: string): number => {
  if (fromCurrency === toCurrency) return price
  const usdPrice = price / mockCurrencyRates[fromCurrency]
  return usdPrice * mockCurrencyRates[toCurrency]
}

export const formatPrice = (price: number, currency: string): string => {
  const currencyInfo = currencies.find((c) => c.code === currency)
  const symbol = currencyInfo?.symbol || currency

  if (currency === "JPY") {
    return `${symbol}${Math.round(price)}`
  }
  return `${symbol}${price.toFixed(2)}`
}
