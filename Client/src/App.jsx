import { useState } from 'react'
import './App.css'
import Hero from './components/hero'
import Services from './components/services'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Hero/>
      <Services/>
    </div>
  )
}

export default App
