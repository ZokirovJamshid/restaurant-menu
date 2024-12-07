'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useOrders, Order } from '@/contexts/OrderContext'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const { orders, updateOrderStatus, clearOrder } = useOrders()
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setFilteredOrders(orders)
  }, [orders])

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    setFilteredOrders(orders.filter(order => 
      order.tableNumber.toLowerCase().includes(query) ||
      order.items.some(item => item.name.toLowerCase().includes(query))
    ))
  }

  const handleClearOrder = (orderId: number) => {
    clearOrder(orderId)
  }

  const getOrdersByStatus = (status: Order['status']) => {
    return filteredOrders.filter(order => order.status === status)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Buyurtmalar boshqaruvi</h1>
      <div className="mb-4">
        <Input
          placeholder="Buyurtma yoki stol raqamini qidirish..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new">Yangi</TabsTrigger>
          <TabsTrigger value="preparing">Tayyorlanmoqda</TabsTrigger>
          <TabsTrigger value="ready">Tayyor</TabsTrigger>
          <TabsTrigger value="delivered">Yetkazildi</TabsTrigger>
        </TabsList>
        {(['new', 'preparing', 'ready', 'delivered'] as const).map(status => (
          <TabsContent key={status} value={status}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getOrdersByStatus(status).map(order => (
                <Card key={order.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Buyurtma #{order.id}</span>
                      <Badge>{order.status}</Badge>
                    </CardTitle>
                    <p>Stol: {order.tableNumber}</p>
                    <p>Sana: {new Date(order.createdAt).toLocaleString()}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-4">
                      {order.items.map((item, index) => (
                        <li key={index}>{item.name} - ${item.price} x {item.quantity}</li>
                      ))}
                    </ul>
                    <p className="font-bold">Jami: ${order.total.toFixed(2)}</p>
                    <div className="mt-4 space-x-2">
                      {status === 'new' && (
                        <Button onClick={() => handleStatusChange(order.id, 'preparing')}>
                          Tayyorlashni boshlash
                        </Button>
                      )}
                      {status === 'preparing' && (
                        <Button onClick={() => handleStatusChange(order.id, 'ready')}>
                          Tayyor deb belgilash
                        </Button>
                      )}
                      {status === 'ready' && (
                        <Button onClick={() => handleStatusChange(order.id, 'delivered')}>
                          Yetkazildi deb belgilash
                        </Button>
                      )}
                      {status === 'delivered' && (
                        <Button variant="destructive" onClick={() => handleClearOrder(order.id)}>
                          Buyurtmani o'chirish
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

