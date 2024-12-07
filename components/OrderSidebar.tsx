import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { OrderItem } from '@/contexts/OrderContext'

interface OrderSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: OrderItem[]
  onRemoveItem: (id: number) => void
  onUpdateQuantity: (id: number, quantity: number) => void
  tableNumber: string
  onTableNumberChange: (value: string) => void
  onOrderConfirm: () => void
}

export function OrderSidebar({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onUpdateQuantity,
  tableNumber, 
  onTableNumberChange, 
  onOrderConfirm 
}: OrderSidebarProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const serviceCharge = subtotal * 0.1
  const total = subtotal + serviceCharge

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Buyurtma</SheetTitle>
          <SheetDescription>
            <Input
              type="number"
              placeholder="Stol raqami"
              value={tableNumber}
              onChange={(e) => onTableNumberChange(e.target.value)}
              className="mt-2"
            />
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-xl">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button variant="destructive" size="sm" onClick={() => onRemoveItem(item.id)}>
                X
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">JAMI</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">XIZMAT HAQI</span>
            <span>10%</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>UMUMIY SUMMA</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Button className="w-full mt-4" onClick={onOrderConfirm}>
          Tasdiqlash
        </Button>
      </SheetContent>
    </Sheet>
  )
}

