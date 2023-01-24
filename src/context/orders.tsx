import { createContext, FunctionComponent, Mixin, ReactNode, useState } from "react";



const waiters: Waiter[] = [
  {
    id: '0',
    name: "vitor"
  },
  {
    id: "1",
    name: "thiago"
  }
]

const items: Item[] = [
  {
    name: "executivo",
    price: 29.99
  },
  {
    name: "feijoada",
    price: 39.99
  },
  {
    name: "doce",
    price: 19.99
  },
]

const mockOrders: Order[] = [
  {
    id: "21",
    status: "created",
    table: 4,
    waiterId: waiters[0].id,
    items: items.map(item => ({
      quantity: 1,
      name: item.name
    })),
  },
  {
    id: "1",
    status: "finished",
    table: 1,
    waiterId: waiters[1].id,
    items: items.map(item => ({
      quantity: 1,
      name: item.name
    })),
  },
]

export type Waiter = {
  id: string;
  name: string
}

export type Item = {
  name: string
  price: number
}

export type ProductOrder = { name: string; quantity: number }

export type Order = {
  id: string
  waiterId: string
  table: number
  status: "created" | "finished"
  items: Array<ProductOrder>
}

type OrderContext = {
  waiters: Waiter[]
  items: Item[]
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

export const OrdersContext = createContext<OrderContext>({
    waiters,
    items,
    orders: []
  } as unknown as OrderContext)

export const OrdersProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  
  return (
    <OrdersContext.Provider value={{
      items,
      orders,
      waiters,
      setOrders
    }}>
      {children}
    </OrdersContext.Provider>
  )
}