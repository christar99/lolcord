import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Navigation } from 'swiper/core';
import "swiper/components/scrollbar/scrollbar.min.css"
import "swiper/components/navigation/navigation.scss";
import "swiper/swiper.scss";


const SwiperContainer = styled.div`
    width: 95vw;
    height: 400px;
    z-index: 21;
    display: flex;
    align-items: center;
    user-select: none;

    .swiper-slide {
        width: auto !important;
    }

    .swiper-container {
        height: 350px;
    }

    .swiper-scrollbar {
        width: 100%;
        height: 10px;
        bottom: 0 ;
        top: auto;
        z-index: 250;
        margin-top: 30px;
        background: #2C3E50;

        .swiper-scrollbar-drag {
            background: rgb(235,102,45);
            &:hover{
                cursor: pointer;
                background: brown;
            }
        }
    }
`;

const ChampionCard = styled.div`
    width: ${props => props.shouldOpenIt ? "550px" : "124px"};
    height: 300px;
    display: flex;
`;


const ChampionName = styled.span`
    width: 100%;
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
    width: ${props => props.shouldOpenIt ? "167px" : "124px"};
    height: ${props => props.shouldOpenIt ? "300px" : "224px"};
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
    position: relative;
    bottom: 0;
    transition-duration: 0.5s;
    margin-top: ${props => props.shouldOpenIt ? 0 : "50px"};

    &:hover {
        border: ${props => props.shouldOpenIt ? "none" : "2px solid skyblue"};
        cursor: pointer;    

        ${ChampionName} {
            width: 100%;
        }
    }
`;

const ChampionInfo = styled.div`
    display: ${props => props.shouldOpenIt ? "block" : "none"};
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

const ViewDetails = styled.div`
    font-size: 1rem;
    width: 120px;
    height: 30px;
    float: right;
    display: grid;
    place-items: center;
    border-radius: 3px;
    background-color: white;
    color: #212F3D;
    border: 1px solid black;
    
    &:hover {
        cursor: pointer;
        background-color: skyblue;
        color: black;
    }
`;

const ClickImage = styled.div`
    width: 50px;
    height: 50px;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
    position: absolute;
    top: 50px;
    right: 50px;
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


SwiperCore.use([Scrollbar, Navigation]);

const ChampionSwiper = ({ champions, clickedChampion }) => {
    const [championKey, setChampionKey] = useState();
    
    const openInfo = target => {
        
        // ????????? ????????? ?????? ????????????
        let slide = target.closest(".swiper-slide");
        let wrapper = target.closest(".swiper-wrapper");
        let container = target.closest(".swiper-container");
        
        // ????????? ?????????
        let targetPosition = slide.offsetLeft;
        let containerHarf = container.offsetWidth /2;
        // 134??? ??????????????? 1?????? ?????? + ?????? 1???, 416??? 550-134
        let slideWidth = 134 * champions.length + 416;
        // 275 = 550 / 2
        let selectTargetPosition = targetPosition + 275;
        let position;
        
        if (selectTargetPosition <= containerHarf) position = 0; // left
        else if ((slideWidth - selectTargetPosition) <= containerHarf) position = slideWidth - containerHarf * 2; //right
        else position = targetPosition - containerHarf + 135;
        
        
        setTimeout(() => {
            wrapper.style.transform = `translate3d(${position*-1}px, 0, 0)`;
            wrapper.style.transitionDuration = `0.8s`;
        }, 0);
    }
    
    
    const clickCard = (key, event) => {
        setChampionKey(key);
        openInfo(event.target);
    }
    
    const designateCard = () => {
        let target = document.querySelector(`.${clickedChampion.id}`);
        setChampionKey(clickedChampion.key);
        openInfo(target);
    }
    
    useEffect(() => {
        if(clickedChampion !== undefined) designateCard();
    }, [clickedChampion]);

    return (
        <SwiperContainer>
            <Swiper
                slidesPerView={13}
                spaceBetween={10}
                navigation
                scrollbar={{ "draggable": true }}
                preventClicks={true}
                preventClicksPropagation={false}
            >
                {champions && champions.map(champion => {
                    return (
                        <SwiperSlide>
                            <ChampionCard shouldOpenIt={championKey === champion.key}>
                                <ChampionImage
                                    className={champion.id}
                                    shouldOpenIt={championKey === champion.key}
                                    bgURL={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                                    onClick={event => clickCard(champion.key, event)}
                                >
                                    <ChampionName>{champion.name}</ChampionName>
                                </ChampionImage>

                                <ChampionInfo shouldOpenIt={championKey === champion.key} >
                                    <Name>{champion.name}</Name>
                                    <Title>{champion.title}</Title>
                                    <Link to={{
                                        pathname: `champions/${champion.id}`,
                                        state: champion
                                    }}>
                                        <ViewDetails>????????? ????????????</ViewDetails>
                                    </Link>
                                    <ClickImage bgURL={require(`assets/click.png`).default} />
                                    <Info>
                                        <Attack attack={champion.info.attack}>???????????????</Attack>
                                        <Magic magic={champion.info.magic}>???????????????</Magic>
                                        <Defense defense={champion.info.defense}>??????</Defense>
                                        <Difficulty difficulty={champion.info.difficulty}>?????????</Difficulty>
                                    </Info>
                                    <Tips>
                                        ???? Tips  <br />
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