"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Product } from "@/types/product"
import { parseProductUrl } from "@/utils/productParser"
import { getRandomPosition } from "@/utils/positioning"

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [maxZIndex, setMaxZIndex] = useState(1)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("moodboard-products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("moodboard-products", JSON.stringify(products))
  }, [products])

  const addProduct = (url: string, customName: string, canvasRef: React.RefObject<HTMLDivElement>) => {
    if (!url.trim()) return false

    const productData = parseProductUrl(url)
    if (!productData) return false

    const newZIndex = maxZIndex + 1
    setMaxZIndex(newZIndex)

    const newProduct: Product = {
      id: Date.now().toString(),
      customName: customName || productData.title,
      position: getRandomPosition(canvasRef.current),
      size: { width: 200, height: 200 },
      rotation: Math.random() * 10 - 5,
      zIndex: newZIndex,
      ...productData,
    }

    setProducts((prev) => [...prev, newProduct])
    return true
  }

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const updateProductName = (id: string, newName: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, customName: newName } : p)))
  }

  const resetLayout = (canvasRef: React.RefObject<HTMLDivElement>) => {
    setProducts((prev) =>
      prev.map((product, index) => ({
        ...product,
        position: getRandomPosition(canvasRef.current),
        rotation: Math.random() * 10 - 5,
        zIndex: index + 1,
      })),
    )
    setMaxZIndex(products.length)
  }

  return {
    products,
    setProducts,
    maxZIndex,
    setMaxZIndex,
    addProduct,
    removeProduct,
    updateProductName,
    resetLayout,
  }
}
