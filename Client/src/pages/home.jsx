import Hero from '../components/hero'
import Services from '../components/services'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero></Hero>
      <Services></Services>
      <Footer></Footer>
    </div>
  )
}

export default Home