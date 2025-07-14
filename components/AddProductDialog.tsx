"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface AddProductDialogProps {
  urlInput: string
  setUrlInput: (value: string) => void
  customName: string
  setCustomName: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onAdd: () => void
}

export function AddProductDialog({
  urlInput,
  setUrlInput,
  customName,
  setCustomName,
  isOpen,
  setIsOpen,
  onAdd,
}: AddProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={!urlInput.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Add to Moodboard
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="custom-name">Custom Name (Optional)</Label>
            <Input
              id="custom-name"
              placeholder="e.g., Aesthetic Mirror, Cozy Hoodie"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={onAdd} className="flex-1">
              Add Product
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
