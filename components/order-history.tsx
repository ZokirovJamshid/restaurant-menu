import { useOrders } from '@/contexts/OrderContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function OrderHistory({ tableNumber }: { tableNumber: string }) {
  const { orders } = useOrders()
  const tableOrders = orders.filter(order => order.tableNumber === tableNumber)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buyurtmalar tarixi</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buyurtmalar tarixi - Stol {tableNumber}</DialogTitle>
          <DialogDescription>
            Ushbu stol uchun barcha buyurtmalar ro'yxati
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {tableOrders.map(order => (
            <div key={order.id} className="border p-4 rounded-md">
              <h4 className="font-bold">Buyurtma #{order.id}</h4>
              <p>Holat: {order.status}</p>
              <p>Sana: {new Date(order.createdAt).toLocaleString()}</p>
              <ul className="mt-2">
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
                ))}
              </ul>
              <p className="mt-2 font-bold">Jami: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

