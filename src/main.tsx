import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './router/App.tsx'
import { PrimeReactProvider } from 'primereact/api';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

// PrimeReact imports
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css"
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
