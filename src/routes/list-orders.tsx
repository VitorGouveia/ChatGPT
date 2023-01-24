import { useContext } from "react"
import { Order, OrdersContext } from "../context/orders"

export const ListOrders = () => {
  const { orders, waiters, setOrders } = useContext(OrdersContext)

  return (
    <div>
      {orders.filter(({ status }) => status === "created").map(({ items, status, table, waiterId, id }, index) => (
        <div key={index}>
          <div>garçom: {waiters.find(waiter => waiter.id === waiterId)?.name}</div>
          <div>mesa: {table}</div>
          
          <div>produtos:</div>
          <ul>
            {items.map(({ name ,quantity }) => (
              <li key={name}>{name} - qtd: {quantity}</li>
            ))}
          </ul>
          
          <button onClick={() => {
            setOrders(orders => {
              let ordersClone = JSON.parse(JSON.stringify(orders))
              const currentOrderIndex = orders.findIndex(el => el.id === id)

              const modifiedOrder: Order = {
                items,
                status: "finished",
                id,
                waiterId,
                table
              }
              ordersClone.splice(currentOrderIndex, 1, modifiedOrder)
              return ordersClone
            })
          }}>finalizar</button>

          <br />
          <br />
          <br />
        </div>
      ))}
    </div>
  )
}