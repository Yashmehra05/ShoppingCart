
import { Fragment } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductList from './pages/productList'
import ProductDetails from './pages/productDetails'
import CartList from './pages/cartList'

function App() {

  return (
      <Fragment>
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/prod-detl/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartList />} />

        </Routes>
      </Fragment>
  )
}

export default App
