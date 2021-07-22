import React, { useEffect, useState } from 'react';
import ChampionPresenter from './ChampionPresenter';
import { versionAPI, ChampionAPI } from 'API';


const ChampionContainer = () => {
    const [champions, setChampions] = useState();
    const [recentVersion, setRecentVersion] = useState();
    const [group, setGroup] = useState("All");
    const [searchValue, setSearchValue] = useState("");
    
    const encodingChmapions = async () => {
        const version = await versionAPI;
        let result = await ChampionAPI();
        
        setChampions(result.map(champion => Object.values(champion)[0]));
        setRecentVersion(version.data[0]);
    }

    // 필터옵션변경할 떄
    const selectedGroup = event => {
        setGroup(event.value);
    }

    // 챔피언 검색
    const searchChampions = event => {
        setSearchValue(event.target.value);
    }
    
    useEffect(() => {
        encodingChmapions();
    }, []);

    

    return (
        <ChampionPresenter 
            version={recentVersion}
            champions={champions}
            selectedGroup={selectedGroup}
            group={group}
            searchChampions={searchChampions}
            searchValue={searchValue}
        />
    );
}

export default ChampionContainer;