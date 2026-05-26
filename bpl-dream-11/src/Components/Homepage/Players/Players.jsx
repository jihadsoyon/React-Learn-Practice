import React, { use, useState } from 'react';
import AvailablePlayers from './AvailablePlayers/AvailablePlayers';
import SelectedPlayer from './SeletedPlayers/SelectedPlayer';


const Players = ({playerPromise, setCoin, coin}) => {
    // console.log(playerPromise);
const players = use(playerPromise);
// console.log(players)

const [selectedType, setSelectedType] = useState("available")
console.log(selectedType, "selectedType")

const [selectedPlayers, setSelectedplayers] = useState([]);


    return (
        <div className='container mx-auto my-[60px]'>
            <div className='flex justify-between gap-4 items-center mb-[20px]'>
                {selectedType === "available" ?  <h2 className='font-bold text-3xl'>Available Players</h2>
                : <h2 className='font-bold text-3xl'>Selected Players({selectedPlayers.length}/{players.length})</h2>
            }
                <div>
                    <button
                    onClick={() => setSelectedType("available")}
                    className={`btn ${selectedType === "available" ? "bg-[#E7FE29]" : ""} rounded-r-none rounded-l-xl`}>Available</button>
                    <button 
                    onClick={() => setSelectedType("selected")}
                    className={`btn ${selectedType === "selected" ? "bg-[#E7FE29]" : ""} rounded-l-none rounded-r-xl`}>Selected({selectedPlayers.length})</button>
                </div>
            </div>
            {selectedType === "available" ?
             <AvailablePlayers 
             players={players} 
             setCoin={setCoin} 
             coin={coin}
             setSelectedplayers={setSelectedplayers}
             selectedPlayers={selectedPlayers}
             > 
             </AvailablePlayers> :
              <SelectedPlayer 
              selectedPlayers={selectedPlayers} setSelectedplayers={setSelectedplayers} setCoin={setCoin} 
             coin={coin}>
            </SelectedPlayer>}
        </div>
    );
};

export default Players;