import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import "Components/css/swiper.css";
import "swiper/components/navigation/navigation.scss";


const SwiperContainer = styled.div`
    width: 95vw;
    height: 400px;
    z-index: 21;
    margin-top: 50px;
`;

const ChampionCard = styled.div`
    width: 550px;
    height: 300px;
    display: flex;
`;


const ChampionName = styled.span`
    width: 124px;
    height: 40px;
    opacity: 0.8;
    background-color: black;
    color: white;
    position: absolute;
    bottom: 0;
    font-size: 1rem;
    display: grid;
    place-items: center;
    letter-spacing: 2px;
    transition-duration: 0.5s;
`;

const ChampionImage = styled.div`
    width: 124px;
    height: 224px;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
    position: relative;
    bottom: 0;
    transition-duration: 0.5s;
    margin-top: 100px;

    &:hover {
        width: 140px;
        height: 252px;
        cursor: pointer;

        ${ChampionName} {
            width: 100%;
        }
    }
`;

const ChampionInfo = styled.div`
    display: none;
    width: 383px;
    height: 100%;
    background-color: #212F3D;
    color: white;
    padding: 15px;
    overflow: auto;
    
    ::-webkit-scrollbar {
        color: black;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #34495E ;
    }
    ::-webkit-scrollbar-track {
        background-color: #17202A;
    }
`;

const Name = styled.span`
    display: inline-block;
    font-size: 1.5rem;
    margin: 10px 10px 15px 0;
`;

const Title = styled.span`
    display: inline-block;
    font-size: 1rem;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const Info = styled.div`
    margin-bottom: 20px;
`;

const barGraph = keyframes`
    from {
        width: 0;
    }
`;

const Graph = styled.div`
    font-size: 1rem;
    position: relative;
    margin-bottom: 10px;
    ::after {
        content: "";
        height: 1rem;
        position: absolute;
        animation: ${barGraph} linear 0.5s;
    }
`;

const Attack = styled(Graph)`
    ::after {
        width: ${props => props.attack * 15}px;
        background: linear-gradient(to bottom, hotpink, red);
        margin-left: 20px;
    }
`;

const Magic = styled(Graph)`
    ::after {
        width: ${props => props.magic * 15}px;
        background: linear-gradient(to bottom, cornflowerblue, blue);
        margin-left: 20px;
    }
`;

const Defense = styled(Graph)`
    ::after {
        width: ${props => props.defense * 15}px;
        background: linear-gradient(to bottom, lightGreen, darkgreen);
        margin-left: 56px;
    }   
`;

const Difficulty = styled(Graph)`
    ::after {
        width: ${props => props.difficulty * 15}px;
        background: linear-gradient(to bottom, indianred, purple);
        margin-left: 42.5px;
    }
`;

const Tips = styled.ul`
    font-size: 1.1rem;
    margin-bottom: 10px;
    list-style: disc;
`;

const TipList = styled.li`
    font-size: 0.95rem;
    margin-left: 10px;
    margin-top: 5px;
`;



SwiperCore.use([Navigation]);

const ChampionSwiper = ({ champions }) => {
    // const clickSlide = event => {
    //     console.log(event.target);
    //     // event.target.parenteNode.classList.add("swiper-slide-next");
    // }

    return (
        <SwiperContainer>
            <Swiper
                spaceBetween={0}
                slidesPerView={7}
                loop={true}
                navigation
            >
                {champions && champions.map(champion => {
                    return (
                        <SwiperSlide>
                            <ChampionCard key={champion.key}>
                                <ChampionImage className="championImage" bgURL={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}>
                                    <ChampionName className="championName">{champion.name}</ChampionName>
                                </ChampionImage>
                                <ChampionInfo className="championInfo">
                                    <Name>{champion.name}</Name>
                                    <Title>{champion.title}</Title>
                                    <Info>
                                        <Attack attack={champion.info.attack}>평타데미지</Attack>
                                        <Magic magic={champion.info.magic}>스킬데미지</Magic>
                                        <Defense defense={champion.info.defense}>방어</Defense>
                                        <Difficulty difficulty={champion.info.difficulty}>난이도</Difficulty>
                                    </Info>
                                    <Tips>
                                        💡 Tips  <br />
                                        {champion.allytips && champion.allytips.map(tip => <TipList>{tip}</TipList>)}
                                    </Tips>
                                </ChampionInfo>
                            </ChampionCard>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </SwiperContainer>
    );
}

export default ChampionSwiper;