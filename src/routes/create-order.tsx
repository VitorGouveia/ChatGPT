import { useCallback, useContext, useMemo, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Order, OrdersContext, ProductOrder } from "../context/orders"

type Form = {
  table: number
  waiterId: string
}

export const CreateOrders = () => {
  const { items: itemsFromDatabase, setOrders, waiters } = useContext(OrdersContext)
  const [items, setItems] = useState<ProductOrder[]>([])
  const { handleSubmit, register, setValue } = useForm<Form>()
  const [searchProduct, setSearchProduct] = useState("")

  const searchItem = itemsFromDatabase.find(item => searchProduct === "" ? false : item.name.includes(searchProduct))

  const processOrder: SubmitHandler<Form> = useCallback(async ({ table, waiterId }) => {
    setOrders(orders => [...orders, {
      id: new Date().getTime().toString(),
      items,
      table,
      waiterId,
      status: "created"
    }])

    setValue("table", 0)
    setValue("waiterId", "")
    setItems([])
    setSearchProduct("")
    // save order
  }, [items])

  return (
    <>
      <h1>Crie um pedido</h1>
    <form style={{ width: "max-content", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(processOrder)}>
      <input type="number" {...register("table")} placeholder="Número da mesa" />


      <div>
        <label>Garçom</label>
        <select {...register("waiterId")} defaultValue={waiters[0].id}>
          {waiters.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="pesquise um produto"
        onChange={event => setSearchProduct(event.target.value)} value={searchProduct}
      />

      <div>
        {searchItem && (
          <button type="button" onClick={() => {
            const itemExists = items.find(item => item.name === searchItem.name)
            if(itemExists) {
              setItems(items => {
                let itemsClone = JSON.parse(JSON.stringify(items))
              const currentItemIndex = items.findIndex(el => el.name === searchItem.name)

              const modifiedItem = {
                name: searchItem.name,
                quantity: itemExists.quantity + 1
              }

              itemsClone.splice(currentItemIndex, 1, modifiedItem)

              return itemsClone
              })
              return
            }

            setItems(items => [...items, { name: searchItem.name, quantity: 1 }])
          }}>{searchItem.name}</button>
        )}
        <div>
          Produtos Selecionados:
          {items.map(({ name, quantity }) => (
            <div key={name}>
              <button type="button">{name} - qtd: {quantity}</button>
              <button type="button" onClick={() => {
                setItems(items => {
                  let itemsClone = JSON.parse(JSON.stringify(items))
                  const currentItemIndex = items.findIndex(el => el.name === name)

                  const modifiedItem = {
                    name,
                    quantity: quantity + 1
                  }

                  itemsClone.splice(currentItemIndex, 1, modifiedItem)

                  return itemsClone
                })
              }}>+</button>
              <button type="button" onClick={() => {
                setItems(items => {
                  let itemsClone = JSON.parse(JSON.stringify(items))
                  const currentItemIndex = items.findIndex(el => el.name === name)

                  if(quantity - 1 === 0) {
                    return items.filter(item => item.name !== name)
                  }

                  const modifiedItem = {
                    name,
                    quantity: quantity - 1
                  }

                  itemsClone.splice(currentItemIndex, 1, modifiedItem)

                  return itemsClone
                })
              }}>-</button>
            </div>
          ))}
        </div>

        <hr />

        <div>
          Produtos:
          {itemsFromDatabase.map(({ name }) => (
            <div key={name}>
              <button type="button" onClick={() => {
                const itemExists = items.find(item => item.name === name)
                if(itemExists) {
                  setItems(items => {
                    let itemsClone = JSON.parse(JSON.stringify(items))
                  const currentItemIndex = items.findIndex(el => el.name === name)

                  const modifiedItem = {
                    name,
                    quantity: itemExists.quantity + 1
                  }

                  itemsClone.splice(currentItemIndex, 1, modifiedItem)

                  return itemsClone
                  })
                  return
                }

                setItems(items => [...items, { name, quantity: 1 }])
              }}>{name}</button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit">criar pedido</button>
    </form>
    </>
  )
}