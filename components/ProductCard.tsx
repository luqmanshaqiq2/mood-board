"use client"

import type React from "react"

import { Edit3, Trash2, Move } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PriceTag } from "./PriceTag"
import type { Product } from "@/types/product"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  preferredCurrency: string
  onMouseDown: (e: React.MouseEvent, productId: string) => void
  onRemove: (id: string) => void
  onUpdateName: (id: string, newName: string) => void
  isDragging: boolean
}

export function ProductCard({
  product,
  preferredCurrency,
  onMouseDown,
  onRemove,
  onUpdateName,
  isDragging,
}: ProductCardProps) {
  const [customName, setCustomName] = useState(product.customName)

  return (
    <div
      className="absolute group"
      style={{
        left: product.position.x,
        top: product.position.y,
        width: product.size.width,
        height: product.size.height,
        transform: `rotate(${product.rotation}deg)`,
        zIndex: product.zIndex,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={(e) => onMouseDown(e, product.id)}
    >
      {/* Product Card */}
      <div className="relative bg-white dark:bg-[hsl(var(--product-card-dark))] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-blue-200">
        {/* Product Image */}
        <div className="aspect-square rounded-t-lg overflow-hidden relative">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.customName}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Site Badge */}
          <Badge className="absolute top-2 left-2 text-xs" variant="secondary">
            {product.site}
          </Badge>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                  <Edit3 className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Product Name</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Enter custom name"
                  />
                  <Button
                    onClick={() => {
                      onUpdateName(product.id, customName)
                    }}
                    className="w-full"
                  >
                    Update Name
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              size="sm"
              variant="destructive"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onRemove(product.id)
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>

          {/* Drag Handle */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 rounded p-1">
              <Move className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.customName}</h3>
        </div>
      </div>

      {/* Price Tag */}
      <PriceTag product={product} preferredCurrency={preferredCurrency} rotation={product.rotation} />
    </div>
  )
}
