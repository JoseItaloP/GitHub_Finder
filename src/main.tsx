import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
//Pages
import Home from './Routes/Home.tsx'
import Repository from './Routes/Repository.tsx'

const router = createBrowserRouter([//cração de rotas
  {
    path: "/",
    element: <App />,//caminho original
    children: [
      {
        path: "/",
        element: <Home />,//filho da rota
      },
      {
        path: "/repos/*",
        element: <Repository />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
