import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

interface OrderSidebarProps {
  items: any[]
  onRemoveItem: (index: number) => void
  tableNumber: string
  onTableNumberChange: (value: string) => void
}

export function OrderSidebar({ items, onRemoveItem, tableNumber, onTableNumberChange }: OrderSidebarProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const serviceCharge = subtotal * 0.1
  const total = subtotal + serviceCharge

  const handleConfirm = () => {
    if (!tableNumber) {
      alert("Iltimos, stol raqamini kiriting")
      return
    }
    // Bu yerda buyurtmani tasdiqlash logikasini qo'shishingiz mumkin
    console.log("Buyurtma tasdiqlandi", { items, tableNumber, total })
  }

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          BUYURTMA
          <Input
            type="number"
            placeholder="Stol raqami"
            value={tableNumber}
            onChange={(e) => onTableNumberChange(e.target.value)}
            className="w-24 ml-auto"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-md"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-xl">${item.price}</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => onRemoveItem(index)}>
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
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button variant="destructive" className="w-full">Bekor qilish
        </Button>
        <Button className="w-full" onClick={handleConfirm}>
          Tasdiqlash
        </Button>
      </CardFooter>
    </Card>
  )
}

