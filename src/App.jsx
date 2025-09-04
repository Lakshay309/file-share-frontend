
import { useEffect, useState } from 'react'
import './App.css'
import Footer from './assets/components/Footer'
import Header from './assets/components/Header'
import Layout from './assets/components/Layout'
import { ThemeProvider } from './assets/context/Theme'
import { Outlet } from 'react-router'

function App() {
  const [themeMode,setThemeMode]=useState(true);
  const toggle=()=>{
    setThemeMode((themeMode)=>!themeMode)
  }
  useEffect(()=>{
    document.querySelector("#root").classList.remove("light","dark");
    document.querySelector("#root").classList.add(
      themeMode?"light":"dark"
    );
  },[themeMode]);

  return (
    <ThemeProvider value={{themeMode,toggle}}>
      <div className="min-h-screen flex flex-col ">
        <Header />
        <main className="flex-1 flex justify-center">
          <Outlet />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
