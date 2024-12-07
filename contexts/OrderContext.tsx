'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: number
  tableNumber: string
  items: OrderItem[]
  total: number
  status: 'new' | 'preparing' | 'ready' | 'delivered'
  createdAt: string
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void
  updateOrderStatus: (id: number, status: Order['status']) => void
  getOrderByTableNumber: (tableNumber: string) => Order | undefined
  clearOrder: (id: number) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const addOrder = (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = { 
      ...order, 
      id: Date.now(), 
      status: 'new', 
      createdAt: new Date().toISOString() 
    }
    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  const updateOrderStatus = (id: number, status: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  const getOrderByTableNumber = (tableNumber: string) => {
    return orders.find(order => order.tableNumber === tableNumber && order.status !== 'delivered')
  }

  const clearOrder = (id: number) => {
    const updatedOrders = orders.filter(order => order.id !== id)
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrderByTableNumber, clearOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

