import { useState } from 'react'
import './App.css'
import Hero from './components/hero'
import Services from './components/services'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Hero/>
      <Services/>
      <Footer/>
    </div>
  )
}

export default App
