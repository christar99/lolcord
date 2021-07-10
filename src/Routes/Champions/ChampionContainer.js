import React, { useEffect, useState } from 'react';
import { championApi } from 'API';
import ChampionPresenter from './ChampionPresenter';

const ChampionContainer = () => {
    const fetchChampions = async () => {
        const champions = await championApi;
        console.log(champions);
    }

    useEffect(() => {
        fetchChampions();
    }, []);
    

    return (
        <ChampionPresenter />
    );
}

export default ChampionContainer;