
import { Suspense, useState } from 'react'
import './App.css'
import Banner from './Components/Homepage/Banner/Banner'
import Players from './Components/Homepage/Players/Players'
import Navbar from './Components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import Footer from './Footer'

const fetchPlayer = async () => {
  const res = await fetch("/data.json")
  return res.json();
}


function App() {

  const playerPromise = fetchPlayer();
  const [coin, setCoin] = useState(50000)
  return (
    <>
      <Navbar coin={coin}></Navbar>
      <Banner></Banner>
      <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
        <Players
          playerPromise={playerPromise}
          setCoin={setCoin}
          coin={coin}>
        </Players>
      </Suspense>
      <Footer></Footer>

  {/* react toastify */}
      <ToastContainer />
    </>
  )
}

export default App
