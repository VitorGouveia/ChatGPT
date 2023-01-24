import { HashRouter, Link, Route, Routes } from "react-router-dom"

import { CreateOrders } from "./routes/create-order"
import { ListOrders } from "./routes/list-orders"

import { OrdersProvider } from "./context/orders"
import { OrderData } from "./routes/order-data"

export const App = () => {
  return (
    <HashRouter>
      <OrdersProvider>
        <div>
          <Link to="/create">Garçom</Link>
        </div>
        <div>
          <Link to="/cozinha">Cozinha</Link>
        </div>
        <div>
          <Link to="/admin">Administração</Link>
        </div>
        <Routes>
          <Route path="/">
            <Route path="/create" element={<CreateOrders />} />
          </Route>
          <Route path="/cozinha">
            <Route index element={<ListOrders />} />
          </Route>
          <Route path="/admin" element={<OrderData />} />
        </Routes>
      </OrdersProvider>
    </HashRouter>
  )
}