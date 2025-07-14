"use client"

import { useState, useEffect, useRef } from "react"
import { ShoppingBag, Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ProductCard"
import { BillSidebar } from "@/components/BillSidebar"
import { AddProductDialog } from "@/components/AddProductDialog"
import { useProducts } from "@/hooks/useProducts"
import { useDragAndDrop } from "@/hooks/useDragAndDrop"
import ThemeToggle from "@/components/ThemeToggle"

export default function MoodboardShoppingPlanner() {
  const [urlInput, setUrlInput] = useState("")
  const [preferredCurrency, setPreferredCurrency] = useState("USD")
  const [customName, setCustomName] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const { products, setProducts, maxZIndex, setMaxZIndex, addProduct, removeProduct, updateProductName, resetLayout } =
    useProducts()

  const { dragState, handleMouseDown, handleMouseMove, handleMouseUp } = useDragAndDrop(
    products,
    setProducts,
    maxZIndex,
    setMaxZIndex,
  )

  // Load preferred currency from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferred-currency")
    if (savedCurrency) {
      setPreferredCurrency(savedCurrency)
    }
  }, [])

  // Save preferred currency to localStorage
  useEffect(() => {
    localStorage.setItem("preferred-currency", preferredCurrency)
  }, [preferredCurrency])

  const handleAddProduct = () => {
    const success = addProduct(urlInput, customName, canvasRef)
    if (success) {
      setUrlInput("")
      setCustomName("")
      setIsAddDialogOpen(false)
    }
  }

  const handleResetLayout = () => {
    resetLayout(canvasRef)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-2">Moodboard Shopping Planner</h1>
                <ThemeToggle />
              </div>
              <p className="text-muted-foreground">
                Create a visual wishlist by pasting product URLs - drag items around to arrange your perfect moodboard
              </p>

              {/* Add Product Section */}
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    placeholder="Paste product URL here (e.g., amazon.com/dp/B08N5WRWNW)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && setIsAddDialogOpen(true)}
                  />
                </div>

                <AddProductDialog
                  urlInput={urlInput}
                  setUrlInput={setUrlInput}
                  customName={customName}
                  setCustomName={setCustomName}
                  isOpen={isAddDialogOpen}
                  setIsOpen={setIsAddDialogOpen}
                  onAdd={handleAddProduct}
                />

                {/* Mobile Bill Sheet */}
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Bill ({products.length})
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <Calculator className="h-5 w-5" />
                          Shopping Bill
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <BillSidebar
                          products={products}
                          preferredCurrency={preferredCurrency}
                          setPreferredCurrency={setPreferredCurrency}
                          onResetLayout={handleResetLayout}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                Try: amazon.com/dp/B08N5WRWNW, aliexpress.com/item/1005003842615, or etsy.com/listing/1234567890
              </p>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-[hsl(var(--product-card-dark))] dark:from-[hsl(var(--product-card-dark))] dark:to-[hsl(var(--product-card-dark))]">
            <div
              ref={canvasRef}
              className="w-full h-full relative cursor-default"
              onMouseMove={(e) => handleMouseMove(e, canvasRef)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {products.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[hsl(var(--product-card-dark))] transition-colors">
                  <div className="text-center">
                    <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-xl font-semibold mb-2 text-muted-foreground dark:text-gray-200">Start Your Moodboard</h3>
                    <p className="text-muted-foreground dark:text-gray-400">
                      Add product URLs above and drag them around to create your perfect layout
                    </p>
                  </div>
                </div>
              ) : (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    preferredCurrency={preferredCurrency}
                    onMouseDown={handleMouseDown}
                    onRemove={removeProduct}
                    onUpdateName={updateProductName}
                    isDragging={dragState.isDragging && dragState.productId === product.id}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Desktop Bill Sidebar */}
        <div className="hidden lg:block">
          <BillSidebar
            products={products}
            preferredCurrency={preferredCurrency}
            setPreferredCurrency={setPreferredCurrency}
            onResetLayout={handleResetLayout}
          />
        </div>
      </div>
    </div>
  )
}
