import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import homepage from './pages/homepage/homepage.jsx'
import Homepage from './pages/homepage/homepage.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './pages/signup.jsx'
import Signin from './pages/signin.jsx'

const router = createBrowserRouter(
  [
    {path : "/",
      element : <>
      <Homepage/>
      </>
    },
    {path : "/signup",
      element : <Signup/>
    },
    {path: "/signin",
      element : <Signin/>
    }
  ]
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Homepage/> */}
    <RouterProvider router={router}/>
    </>
  )
}

export default App
