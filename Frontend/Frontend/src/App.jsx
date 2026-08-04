import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import homepage from './pages/homepage/homepage.jsx'
import Homepage from './pages/homepage/homepage.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './pages/auth/signup.jsx'
import Signin from './pages/auth/signin.jsx'
import Editor from './pages/editor/editor.jsx'
import ProtectedRoute from './components/protected_routes.jsx'

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
    },
    {path: "/editor",
      element : (
        <ProtectedRoute>
          <Editor/>
        </ProtectedRoute>
      )
    },
    
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
