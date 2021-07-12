import React, { useEffect, useState } from 'react';
import ChampionPresenter from './ChampionPresenter';
import { ChampionAPI } from 'API';


const ChampionContainer = () => {
    const [champions, setChampions] = useState();

    const fetchURL = async () => {
        setChampions(await ChampionAPI());
    }

    useEffect(() => fetchURL(), []);

    return (
        <ChampionPresenter 
            champions={champions}
        />
    );
}

export default ChampionContainer;