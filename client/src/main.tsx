import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import {store} from './Redux/store';

import App from './App'
createRoot(document.getElementById('MainDivRoute')!).render(
  <Provider store={store}>
    <StrictMode>
      <App /> 
    </StrictMode>
  </Provider>
)
