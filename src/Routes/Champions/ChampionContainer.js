import React, { useEffect, useState } from 'react';
import ChampionPresenter from './ChampionPresenter';
import { versionAPI, ChampionAPI } from 'API';


const ChampionContainer = () => {
    const [loading, setLoading] = useState(true);
    const [champions, setChampions] = useState();
    const [recentVersion, setRecentVersion] = useState();
    const [group, setGroup] = useState("All");
    const [searchValue, setSearchValue] = useState("");
    const [clickedChampion, setClickedChampion] = useState();
    
    const encodingChmapions = async () => {
        const version = await versionAPI;
        let result = await ChampionAPI();
        // 챔피언api 바꿔치기
        result = result.map(champion => Object.values(champion)[0]);
        //챔피언이름 가나다순으로 정렬
        result = result.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

        setLoading(false);
        setChampions(result);
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

    const clickChampion = key => {
        let championProps = champions.filter(champion => champion.key === key);
        setClickedChampion(championProps[0]);
    }
    
    useEffect(() => {
        encodingChmapions();
    }, []);


    return (
        <ChampionPresenter 
            loading={loading}
            version={recentVersion}
            champions={champions}
            selectedGroup={selectedGroup}
            group={group}
            searchChampions={searchChampions}
            searchValue={searchValue}
            clickChampion={clickChampion}
            clickedChampion={clickedChampion}
        />
    );
}

export default ChampionContainer;