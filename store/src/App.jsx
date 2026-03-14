import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Lookbook from './pages/Lookbook/Lookbook'
import Carrito from './pages/Carrito/Carrito'
import Drops from './pages/Drops/Drops'
import Checkout from './pages/Checkout/Checkout'
import Colecciones from './pages/Colecciones/Colecciones'
import Nosotros from './pages/Nosotros/Nosotros'
import { CartProvider } from './context/CartContext'
import { CollectionsProvider } from './context/CollectionsContext'

function App() {
  return (
    <CollectionsProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/drops" element={<Drops />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/colecciones" element={<Colecciones />} />
              <Route path="/nosotros" element={<Nosotros />} />
              {/* Catch-all for non-existent routes */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </CollectionsProvider>
  )
}

export default App
