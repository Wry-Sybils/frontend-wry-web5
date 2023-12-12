import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { CreateDataProvider } from './context/CreateDataContext.tsx'
import { DataContentProvider } from './context/DataContentContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <CreateDataProvider>
          <DataContentProvider>
            <App />
          </DataContentProvider>
        </CreateDataProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
