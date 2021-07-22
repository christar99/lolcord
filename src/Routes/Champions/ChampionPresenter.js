import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Champions from 'Components/champions/Champions';


const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    filter: blur(2px);
    background: url(${props => props.bgURL});
    background-position: center center;
    background-size: cover;
`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding-top: 50px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;



const ChampionPresenter = ({ version, champions, selectedGroup, group, searchChampions, searchValue }) => {

    // 선택한 챔피언그룹을 목록에 출력
    let filteredChampions = champions;
    if(group !== "All")  filteredChampions = champions.filter(champion => champion.tags.includes(group));

    return (
        <>
            <Helmet>
                <title>LOLCORD 챔피언도감</title>
            </Helmet>

            {/* 배경 */}
            <Background bgURL={require(`assets/runeterra.jpg`).default} />

            <Container>
                {/* 챔피언 리스트 */}
                <Champions 
                    version={version} 
                    champions={filteredChampions} 
                    selectedGroup={selectedGroup}
                    group={group}
                    searchChampions={searchChampions}
                    searchValue={searchValue}
                />
            </Container>
        </>
    );
}

export default ChampionPresenter;
