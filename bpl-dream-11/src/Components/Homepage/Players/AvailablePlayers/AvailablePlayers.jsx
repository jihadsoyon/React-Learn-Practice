import React from 'react';
import Card from '../../../ui/Card';

const AvailablePlayers = ({ players, setCoin, coin, setSelectedplayers, selectedPlayers}) => {
    console.log(players, "players")
    return (
        <div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {
    players.map((player, ind) => {
        // console.log(player, "player")
        return <Card key={ind} player={player} setCoin={setCoin} coin={coin} setSelectedplayers={setSelectedplayers} selectedPlayers={selectedPlayers}></Card>
    })
}
</div>


            
        </div>
    );
};

export default AvailablePlayers;