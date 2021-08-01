import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: ${props => props.isSelected ? "flex" : "none"};
`;
const ChampionImage = styled.div`
    width: 55vw;
    height: 80vh;
    background: linear-gradient(to left, transparent, black), url(${props => props.bgURL});
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;
    position: absolute;
    top: calc(10vh + 25px);
    right: 10vw;
    z-index: 1;
`;

const Content = styled.div`
    width: 33%;
    height: 100%;
    padding: 10px 30px;
    font-size: 1rem;
    margin-top: 200px;
`;

const Discription = styled.p`
    width: 100%;
    white-space: pre-line;
    margin-bottom: 30px;
`;

const SubTitle = styled.span`
    display: inline-block;
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

const Parentheses = styled.span`
    display: inline-block;
    font-size: 1rem;
`;

const StatsContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-bottom: 20px;
`;

const Stats = styled.li`
    display: ${props => props.isMPZero ? "none" : "block"};
`;

const PerLevel = styled.span`
    color: #2AFF00;
    font-size: 0.8rem;
    font-style: italic;
`;


const Outline = ({ champion, isSelected }) => {
    return (
        <Container isSelected={isSelected}>
            <Content>
                <Discription>{champion.lore}</Discription>
                <SubTitle>스탯   
                    <Parentheses> (괄호안은 레벨업당 증가량) </Parentheses>
                </SubTitle>
                <StatsContainer>
                    <Stats isMPZero={false}>체력: {champion.stats.hp} <PerLevel>(+{champion.stats.hpperlevel})</PerLevel></Stats>
                    <Stats isMPZero={false}>체력회복량: {champion.stats.hpregen} <PerLevel>(+{champion.stats.hpregenperlevel})</PerLevel></Stats>
                    <Stats isMPZero={false}>공격력: {champion.stats.attackdamage} <PerLevel>(+{champion.stats.attackdamageperlevel})</PerLevel></Stats>
                    <Stats isMPZero={false}>공격속도: {champion.stats.attackspeed} <PerLevel>(+{champion.stats.attackspeedperlevel}%)</PerLevel></Stats>
                    <Stats isMPZero={false}>방어력: {champion.stats.armor} <PerLevel>(+{champion.stats.armorperlevel})</PerLevel></Stats>
                    <Stats isMPZero={false}>마법저항력: {champion.stats.spellblock} <PerLevel>(+{champion.stats.spellblockperlevel})</PerLevel></Stats>
                    <Stats isMPZero={false}>공격사거리: {champion.stats.attackrange}</Stats>
                    <Stats isMPZero={false}>이동속도: {champion.stats.movespeed}</Stats>
                    <Stats isMPZero={champion.stats.mp === 0}>마나(기력): {champion.stats.mp} <PerLevel>(+{champion.stats.mpperlevel})</PerLevel></Stats>
                </StatsContainer>
                
            </Content>
            <ChampionImage bgURL={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`} />
        </Container>
    );
}

export default Outline;