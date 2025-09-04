import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Router } from 'react-router'
import { Route } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Input from './assets/components/Input.jsx'
import GetFile from './assets/components/GetFile.jsx'
import Layout from './assets/components/Layout.jsx'
import GetCode from './assets/components/GetCode.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path="" element={<Layout/>}>
        <Route path=""  element={<Input/>}/>
        <Route path="get-code"  element={<GetCode/>}/>
        <Route path="receive" >
          <Route index  element={<GetFile/>}/>
      </Route>
      </Route>
      
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)


/*
  which tab currently on send or receive
  is Uploaded  variable

*/

/*

--bg-dark: hsl(336 0% 1%);
--bg: hsl(300 0% 4%);
--bg-light: hsl(0 0% 9%);
--text: hsl(300 0% 95%);
--text-muted: hsl(300 0% 69%);
--highlight: hsl(330 0% 39%);
--border: hsl(0 0% 28%);
--border-muted: hsl(300 0% 18%);
--primary: hsl(220 78% 76%);
--secondary: hsl(40 53% 60%);
--danger: hsl(9 26% 64%);
--warning: hsl(52 19% 57%);
--success: hsl(146 17% 59%);
--info: hsl(217 28% 65%);


--bg-dark: hsl(0 0% 90%);
--bg: hsl(300 0% 95%);
--bg-light: hsl(300 50% 100%);
--text: hsl(300 0% 4%);
--text-muted: hsl(0 0% 28%);
--highlight: hsl(300 50% 100%);
--border: hsl(NaN 0% 50%);
--border-muted: hsl(340 0% 62%);
--primary: hsl(221 49% 33%);
--secondary: hsl(44 100% 14%);
--danger: hsl(9 21% 41%);
--warning: hsl(52 23% 34%);
--success: hsl(147 19% 36%);
--info: hsl(217 22% 41%);

*/