import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.scss";

const Container = styled.div`
    width: 80vw;
    height: 80vh;
    display: ${props => props.isSelected ? "flex" : "none"};
    top: calc(10vh + 25px);
`;

const Background = styled.div`
    width: 80vw;
    height: 80vh;
    position: absolute;
    z-index: 1;
    background: linear-gradient(to left top, transparent 30%, black), url(${props => props.bgURL});
    background-size: cover;
    background-position: top right;
`;

const SwiperContainer = styled.div`
    width: 80vw;
    height: 160px;
    position: absolute;
    bottom: calc(10vh - 25px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 26;

    .swiper-container {
        width: 80%;
        height: 100%;
        bottom: 0;
        
        .swiper-wrapper {
            height: 125px;
            position: relative;
            margin-top: 10px;
        }

        .swiper-slide {
            width: auto !important;
            height: 125px !important;
            position: relative;
            bottom: 0;
            margin-right: 20px;
        }
    }
`;

const SkinName = styled.span`
    width: 100%;
    display: flex;
    font-size: 1.5rem;
    font-style: italic;
    position: absolute;
    top: -10px;
    justify-content: center;

    &::before {
        content: "";
        width: 25%;
        height: 2px;
        position: relative;
        top: 10px;
        right: 5px;
        background: skyblue;
    }

    &::after {
        content: "";
        width: 25%;
        height: 2px;
        position: relative;
        top: 10px;
        left: 5px;
        background: skyblue;
    }
`;

const SkinImage = styled.div`
    width: ${props => props.isClicked ? "200px" : "133px"};
    height: ${props => props.isClicked ? "125px" : "75px"};
    border: 2px solid ${props => props.isClicked ? "brown" : "rgb(235,102,45)"};
    margin-top: ${props => props.isClicked ? 0 : "50px"};

    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center;

    &:hover {
        cursor: pointer;
        border: 2px solid skyblue;
    }
`;

const Skin = ({ champion, isSelected }) => {
    const [skinId, setSkinId] = useState(`${champion.skins[0].num}`);
    const [skinName, setSkinName] = useState(`${champion.name}`);

    const openInfo = target => {
        
        // 클릭한 카드와 전체 컨테이너
        let slide = target.closest(".swiper-slide");
        let wrapper = target.closest(".swiper-wrapper");
        let container = target.closest(".swiper-container");
        
        // 타겟의 포지션
        let targetPosition = slide.offsetLeft;
        let containerHarf = container.offsetWidth /2;
        // 133는 챔피언카드 1개의 너비 + 여백 1개, 66은 200-133
        let slideWidth = 133 * champion.skins.length + 66;
        // 100 / 2
        let selectTargetPosition = targetPosition + 100;
        let position;
        
        if (selectTargetPosition <= containerHarf) position = 0; // left
        else if ((slideWidth - selectTargetPosition) <= containerHarf) position = slideWidth - containerHarf * 1.5; //right
        else position = targetPosition - containerHarf + 100;
        
        
        setTimeout(() => {
            wrapper.style.transform = `translate3d(${position*-1}px, 0, 0)`;
            wrapper.style.transitionDuration = `0.8s`;
        }, 0);
    }
    
    const clickSkin = event => {
        setSkinName(event.target.id);
        setSkinId(`${champion.skins.filter(skin => event.target.id === skin.name)[0].num}`);
        openInfo(event.target);
    };

    return (
        <Container isSelected={isSelected}>
            <Background bgURL={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skinId}.jpg`} />

            <SwiperContainer>
                <SkinName>{skinName === "default" ? champion.name : skinName}</SkinName>
                <Swiper
                    preventClicks={true}
                    preventClicksPropagation={false}
                >
                    {champion.skins.map(skin => {
                        return (
                            <SwiperSlide>
                                <SkinImage 
                                    key={skin.num} 
                                    bgURL={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`} 
                                    id={skin.name}
                                    onClick={clickSkin}
                                    isClicked={`${skin.num}` === skinId}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </SwiperContainer>
        </Container>
    );
}
export default Skin;