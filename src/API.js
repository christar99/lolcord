import axios from 'axios';

export const versionAPI = axios('https://ddragon.leagueoflegends.com/api/versions.json');

export const itemAPI = axios('http://ddragon.leagueoflegends.com/cdn/11.11.1/data/ko_KR/item.json');
