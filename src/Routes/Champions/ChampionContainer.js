import React, { useEffect, useState } from 'react';
import ChampionPresenter from './ChampionPresenter';
import { ChampionAPI } from 'API';


const ChampionContainer = () => {
    const [champions, setChampions] = useState();
    
    const encodingChmapions = async () => {
        let result = await ChampionAPI();
        setChampions(result.map(champion => Object.values(champion)[0]));
    }

    useEffect(() => encodingChmapions(), []);


    return (
        <ChampionPresenter 
            champions={champions}
        />
    );
}

export default ChampionContainer;