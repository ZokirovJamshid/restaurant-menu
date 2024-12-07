import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { OrderItem } from '@/contexts/OrderContext'

const menuItems = [
  {
    id: 1,
    name: "Tovuq qanotchalari",
    category: "G",
    spicy: true,
    price: 20,
    image: "/placeholder.svg?height=200&width=200",
    type: "starter"
  },
  {
    id: 2,
    name: "Kartoshka fri",
    category: "G",
    price: 5,
    image: "/placeholder.svg?height=200&width=200",
    type: "starter"
  },
  {
    id: 3,
    name: "Yozgi salat",
    category: "N",
    spicy: true,
    price: 10,
    image: "/placeholder.svg?height=200&width=200",
    type: "starter"
  },
  {
    id: 4,
    name: "Steyk",
    category: "G",
    price: 30,
    image: "/placeholder.svg?height=200&width=200",
    type: "main"
  },
  {
    id: 5,
    name: "Pasta",
    category: "G",
    price: 15,
    image: "/placeholder.svg?height=200&width=200",
    type: "main"
  },
  {
    id: 6,
    name: "Kola",
    category: "D",
    price: 2,
    image: "/placeholder.svg?height=200&width=200",
    type: "drinks"
  },
  {
    id: 7,
    name: "Choy",
    category: "D",
    price: 1,
    image: "/placeholder.svg?height=200&width=200",
    type: "drinks"
  },
  {
    id: 8,
    name: "Tiramisu",
    category: "D",
    price: 8,
    image: "/placeholder.svg?height=200&width=200",
    type: "desserts"
  },
]

interface MenuGridProps {
  onAddItem: (item: Omit<OrderItem, 'quantity'>) => void
  searchQuery: string
}

export function MenuGrid({ onAddItem, searchQuery }: MenuGridProps) {
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Tabs defaultValue="starter">
      <TabsList className="grid w-full grid-cols-4 mb-4">
        <TabsTrigger value="starter">STARTER</TabsTrigger>
        <TabsTrigger value="main">ASOSIY TAOMLAR</TabsTrigger>
        <TabsTrigger value="drinks">ICHIMLIKLAR</TabsTrigger>
        <TabsTrigger value="desserts">DESSERTLAR</TabsTrigger>
      </TabsList>
      {["starter", "main", "drinks", "desserts"].map((type) => (
        <TabsContent key={type} value={type} className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredItems
              .filter(item => item.type === type)
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">KATEGORIYA:</span>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-500">
                            {item.category}
                          </span>
                          {item.spicy && (
                            <span className="text-red-500">🌶️</span>
                          )}
                        </div>
                        <span className="font-bold">${item.price}</span>
                      </div>
                      <Button 
                        className="w-full mt-2" 
                        onClick={() => onAddItem(item)}
                      >
                        Qo'shish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

