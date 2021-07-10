import axios from 'axios';

export const versionAPI = axios('https://ddragon.leagueoflegends.com/api/versions.json');

export const itemAPI = axios('https://ddragon.leagueoflegends.com/cdn/11.13.1/data/ko_KR/item.json');

export const championApi = axios('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json');
