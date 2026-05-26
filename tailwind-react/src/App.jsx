import { Suspense } from 'react'
import './App.css'
import Daisynav from './Components/Daisynav/daisynav'
import NavBar from './Components/NavBarr/NavBar'
import PricingOption from './Components/PricingOptions/PricingOption'
import ResultsChart from './Components/ResultsChart/ResultsChart'
import axios from 'axios'
import MarksChart from './Components/MarksChart/marksChart'

const pricingPromise = fetch('pricingData.json').then(res => res.json());
const marksPromise = axios.get('/marksData.json').then(res => res.data);


function App() {


  return (
    <>

        <header>
            <NavBar></NavBar>
          
            {/* <Daisynav></Daisynav> */}

        </header>

        <main>
          <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
            <PricingOption pricingPromise={pricingPromise}></PricingOption>
          </Suspense>

          <Suspense fallback={<span className="loading loading-spinner loading-lg"></span>}>
          <MarksChart marksPromise={marksPromise}></MarksChart>
          </Suspense>
           <ResultsChart></ResultsChart>

        </main>
         
    </>
  )
}

export default App
