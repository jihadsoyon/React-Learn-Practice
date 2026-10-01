import { Suspense } from 'react'
import './App.css'
import Banner from './components/Banner/Banner'
import Footer from './components/Footer/Footer'
import NavBar from './components/Navbar/Navbar'
import AllModelCart from './components/AllModelcart/AllModelCart'


const fetchModel = async () => {
  const res = await fetch('/models.json')   
  return res.json()
}

function App() {
  const modelPromise = fetchModel()

  return (
    <>
      <NavBar></NavBar>
      <Banner></Banner>
      <Suspense fallback={<span className="loading loading-bars loading-xl"></span>}>
        <AllModelCart modelPromise={modelPromise}></AllModelCart>
      </Suspense>
      <Footer></Footer>
    </>
  )
}

export default App