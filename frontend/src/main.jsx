import {BrowserRouter} from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import ShopContextProvider from './context/ShopContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <ShopContextProvider>
    <App />
      </ShopContextProvider>
  </BrowserRouter>,
)
