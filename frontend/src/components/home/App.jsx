import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './header';
import Section from './section';

import PageProduct from '../produto/page-produto';
import PageCategoria from '../categoria/page-categoria';
import Carrinho from '../comprar/carrinho';
import FinalizarCompra from '../comprar/finalizar-compra';
import { CartProvider } from '../comprar/cart-context';
import '../../styles/app.scss';


function App() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <CartProvider>
      <div className="container">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header onResults={setSearchResults} />
              <Section searchResults={searchResults} />
            </>
          } />
          <Route path="/produto/:id" element={<><Header onResults={setSearchResults} />
            <PageProduct />
          </>
          } />
          <Route path="/categoria/:category" element={<><Header onResults={setSearchResults} />
            <PageCategoria />
          </>
          } />
          <Route path="/carrinho" element={<><Header onResults={setSearchResults} /><Carrinho /></>} />
          <Route path="/finalizar-compra" element={<><Header onResults={setSearchResults} /><FinalizarCompra /></>} />
        </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  )
}

export default App
