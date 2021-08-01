import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Outline from 'Components/champions/Outline';
import Skills from 'Components/champions/Skills';
import Skin from 'Components/champions/Skin';

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

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    padding-top: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

const Container = styled.div`
    width: 80vw;
    height: 80vh;
    background-color: black;
    z-index: 20;
    color: #fff;
`;

const ChampionName = styled.span`
    display: flex;
    align-items: center;
    font-size: 2rem;
    margin: 30px;
    position: absolute;
    z-index: 25;
`;

const Positions = styled.div`
    width: 50px;
    height: 50px;
    display: inline-block;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center;
    margin-right: 15px;
`;

const SubName = styled.span`
    display: inline-block;
    font-size: 1.5rem;
    margin-left: 15px;
    color: #C6C6C6;
`;

const Navigation = styled.ul`
    width: 225px;
    height: 40px;
    display: flex;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    margin-top: 100px;
    margin-left: 50px;
    margin-bottom: 20px;
    position: absolute;
    z-index: 25;
`;

const NavigationList = styled.li`
    width: 75px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: ${props => props.isSelected ? "#fff" : "#6C6C6C" };
    text-decoration: ${props => props.isSelected ? "underline 2px" : "none"};

    &:hover {
        cursor: pointer;
        color: #fff;
    }
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
`;

const ChampionDetail = () => {
    let location = useLocation();
    let champion = location.state;
    const [menu, setMenu] = useState("outline");
    
    switch (champion.tags[0]) {
        case "Assassin":
            champion.position = "암살자"
            break;
        case "Fighter":
            champion.position = "전사"
            break;
        case "Mage":
            champion.position = "마법사"
            break;
        case "Marksman":
            champion.position = "원거리딜러"
            break;
        case "Support":
            champion.position = "서포터"
            break;
        default:
            champion.position = "탱커"
            break;
     }

    const selectMenu = event => {
        setMenu(event.target.id);
    }

    return (
        <>
            <Helmet>
                <title>{champion.name}-챔피언정보 LOLCORD</title>
            </Helmet>

            <Background bgURL={require(`assets/runeterra.jpg`).default} />
            <Wrap>
                <Container>
                    <ChampionName>
                        <Positions title={champion.position} bgURL={require(`assets/positions/${champion.tags[0]}.png`).default}/>
                        {champion.name}
                        <SubName>{champion.title}</SubName>
                    </ChampionName>
                    
                    <Navigation>
                        <NavigationList id="outline" isSelected={menu === "outline"} onClick={selectMenu} >개요</NavigationList>
                        <NavigationList id="skills" isSelected={menu === "skills"} onClick={selectMenu}>스킬</NavigationList>
                        <NavigationList id="skin" isSelected={menu === "skin"} onClick={selectMenu}>스킨</NavigationList>
                    </Navigation>
                    <Content>
                        <Outline isSelected={menu === "outline"} champion={champion}/>
                        <Skills isSelected={menu === "skills"} champion={champion}/>
                        <Skin isSelected={menu === "skin"} champion={champion}/>
                    </Content>
                </Container>
            </Wrap>
        </>
    )
}

export default ChampionDetail;