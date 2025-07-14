"use client"

import type React from "react"

import { useState } from "react"
import type { DragState, Product } from "@/types/product"

export const useDragAndDrop = (
  products: Product[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  maxZIndex: number,
  setMaxZIndex: React.Dispatch<React.SetStateAction<number>>,
) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    productId: null,
  })

  const bringToFront = (id: string) => {
    const newZIndex = maxZIndex + 1
    setMaxZIndex(newZIndex)
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, zIndex: newZIndex } : p)))
  }

  const handleMouseDown = (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    const product = products.find((p) => p.id === productId)
    if (!product) return

    bringToFront(productId)

    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    setDragState({
      isDragging: true,
      dragOffset: { x: offsetX, y: offsetY },
      productId,
    })
  }

  const handleMouseMove = (e: React.MouseEvent, canvasRef: React.RefObject<HTMLDivElement>) => {
    if (!dragState.isDragging || !dragState.productId) return

    const canvas = canvasRef.current
    if (!canvas) return

    const canvasRect = canvas.getBoundingClientRect()
    const newX = e.clientX - canvasRect.left - dragState.dragOffset.x
    const newY = e.clientY - canvasRect.top - dragState.dragOffset.y

    setProducts((prev) =>
      prev.map((p) =>
        p.id === dragState.productId
          ? {
              ...p,
              position: {
                x: Math.max(0, Math.min(newX, canvasRect.width - p.size.width)),
                y: Math.max(0, Math.min(newY, canvasRect.height - p.size.height)),
              },
            }
          : p,
      ),
    )
  }

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      productId: null,
    })
  }

  return {
    dragState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}
