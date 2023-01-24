import { useContext, useMemo } from "react"
import { OrdersContext } from "../context/orders"

export const OrderData = () => {
  const { orders, items, waiters } = useContext(OrdersContext)
  const receita = useMemo(() => {
    return orders
      .filter(({ status }) => status === "finished")
      .map(({ items }) => items)
      .flat()
      .reduce((acc, { name, quantity }) => {
        const product = items.find(item => item.name === name)?.price!
        const productPrice = quantity * product

        return acc + productPrice
      }, 0)

  }, [orders, items])
  const pedidosPorGarcom = useMemo(() => {
    return orders
      .filter(({ status }) => status === "finished")
      .reduce((acc, { waiterId, items: _items }) => {
        const waiter = waiters.find(waiter => waiter.id === waiterId)!
        if(!acc[waiter.name]) {
          acc[waiter.name] = {
            orders: 0,
            totalPrice: 0
          }
        }

        const totalOrderValue = _items
        .reduce((acc, { name, quantity }) => {
          const product = items.find(item => item.name === name)?.price!
          const productPrice = quantity * product
  
          return acc + productPrice
        }, 0)

        acc[waiter.name].orders += 1
        acc[waiter.name].totalPrice += totalOrderValue
        
        return acc
      }, {} as Record<string, {
        orders: number;
        totalPrice: number
      }>)
  }, [orders, waiters])
  console.log()

  return (
    <div>
      <h1>Receita = R$ {receita}</h1>

      <ul>

        {Object.entries(pedidosPorGarcom).map(([name, { orders, totalPrice }]) => (
          <li key={name}>
            <div>{name}</div>
            <div>pedidos realizados: {orders}</div>
            <div>faturamento dos pedidos: {totalPrice}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}