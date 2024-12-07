'use client'

import { useState, useEffect } from 'react'
import { Search, ShoppingCart } from 'lucide-react'
import { MenuGrid } from "@/components/menu-grid"
import { OrderSidebar } from "@/components/OrderSidebar"
import { Input } from "@/components/ui/input"
import { useOrders, OrderItem } from '@/contexts/OrderContext'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { OrderHistory } from "@/components/order-history"

export default function ClientPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([])
  const [tableNumber, setTableNumber] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { getOrderByTableNumber, addOrder } = useOrders()
  const { toast } = useToast()

  const currentOrder = getOrderByTableNumber(tableNumber)

  const handleAddItem = (item: Omit<OrderItem, 'quantity'>) => {
    const existingItem = selectedItems.find(i => i.id === item.id)
    if (existingItem) {
      setSelectedItems(selectedItems.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
    toast({
      title: "Mahsulot qo'shildi",
      description: `${item.name} savatga qo'shildi`,
    })
  }

  const handleRemoveItem = (id: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id))
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id)
    } else {
      setSelectedItems(selectedItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleOrderConfirm = () => {
    if (!tableNumber) {
      toast({
        title: "Xatolik",
        description: "Iltimos, stol raqamini kiriting",
        variant: "destructive",
      })
      return
    }
    if (selectedItems.length === 0) {
      toast({
        title: "Xatolik",
        description: "Buyurtma bo'sh",
        variant: "destructive",
      })
      return
    }
    const newOrder = {
      tableNumber,
      items: selectedItems,
      total: selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
    addOrder(newOrder)
    setSelectedItems([])
    setTableNumber('')
    toast({
      title: "Buyurtma yuborildi",
      description: "Sizning buyurtmangiz muvaffaqiyatli yuborildi",
    })
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white p-4 border-b">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-primary">POS</div>
          <div className="flex-1 max-w-md mx-4 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Taom yoki buyurtma qidirish..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleString()}
            </div>
            <Button variant="outline" onClick={() => setIsSidebarOpen(true)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Savat ({selectedItems.reduce((sum, item) => sum + item.quantity, 0)})
            </Button>
          </div>
        </div>
      </header>

      {currentOrder && (
        <Alert className="max-w-7xl mx-auto mt-4">
          <AlertTitle>Buyurtma holati: {currentOrder.status}</AlertTitle>
          <AlertDescription>
            Buyurtma raqami: {currentOrder.id}, Stol raqami: {currentOrder.tableNumber}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex max-w-7xl mx-auto mt-4 gap-4 p-4">
        <div className="flex-1">
          <MenuGrid onAddItem={handleAddItem} searchQuery={searchQuery} />
        </div>
      </div>

      <OrderSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={selectedItems} 
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        tableNumber={tableNumber}
        onTableNumberChange={setTableNumber}
        onOrderConfirm={handleOrderConfirm}
      />

      <div className="fixed bottom-4 right-4">
        <OrderHistory tableNumber={tableNumber} />
      </div>
    </div>
  )
}

