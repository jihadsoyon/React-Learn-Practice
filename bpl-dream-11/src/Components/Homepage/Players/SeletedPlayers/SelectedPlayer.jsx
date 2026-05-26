import React from 'react';

import SelectedCard from '../../../ui/SelectedCard';

const SelectedPlayer = ({selectedPlayers, setSelectedplayers, setCoin, coin}) => {
    console.log(selectedPlayers)

    const handleDeleteSelectedPlayer = (player) => {
    console.log(selectedPlayers)
    const filteredPlayers = selectedPlayers.filter(selectedPlayer => selectedPlayer.playerName != player.playerName)

    console.log(filteredPlayers, 'filteredPlayers')
    setSelectedplayers(filteredPlayers);
    setCoin(coin + player.price)

    }

    return (
        <div>
           <div className='space-y-4'>
             {
                selectedPlayers.length === 0 ? 
                <div className='h-[400px] flex items-center justify-center flex-col gap-3'>
                    <h2 className='font-semibold text-xl'>No player selected yet</h2>
                    <p>Go to Available tab to select players</p>
                </div>
                :
                selectedPlayers.map((player, ind) => {
                    return(
                         <SelectedCard 
                         key={ind}
                         player={player} 
                         handleDeleteSelectedPlayer={handleDeleteSelectedPlayer}>
                         </SelectedCard>
                    );
                    
                } )
            }
           </div>
        </div>
    );
};

export default SelectedPlayer;