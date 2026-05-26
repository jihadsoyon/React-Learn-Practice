import { useState } from "react"

export default function Batsman(){
  const[runs, setRuns] = useState(0);
  const [sixes, Setsixes] = useState(0)
  const handleSingle = () => {
    const updatedRuns = runs + 1;
    setRuns(updatedRuns);
  }

  const handleSix = () => {
    const updatedRuns = runs + 6;
    const updatedSixs = sixes + 1;
    Setsixes(updatedSixs)
    setRuns(updatedRuns)
  }



  return(
  <div>
  <h3>Player: Bangla Batsman</h3>
  <p><small>Six: {sixes}</small></p>
  {
    runs > 50 && <p>You Score: 50</p>
  }
  <h1>Score: {runs}</h1>
  <button onClick={handleSingle}>singles</button>
  <button>Four</button>
  <button onClick={handleSix}>Six</button>
  </div>
)
}

