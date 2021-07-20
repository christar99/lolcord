import axios from 'axios';

export const versionAPI = axios('https://ddragon.leagueoflegends.com/api/versions.json');

export const itemAPI = axios('https://ddragon.leagueoflegends.com/cdn/11.14.1/data/ko_KR/item.json');

const championList = axios('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/ko_KR/champion.json');

export const ChampionAPI = async () => {
    const championName = Object.keys((await championList).data.data);

    const champions = championName.map(champion => axios(`https://ddragon.leagueoflegends.com/cdn/11.14.1/data/ko_KR/champion/${champion}.json`));

    let championState = [];
    for(let champion of champions) {
        championState.push((await champion).data.data);
    }
    
    return championState;
}