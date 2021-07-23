import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import "Components/css/swiper.css";
import "swiper/components/navigation/navigation.scss";


const SwiperContainer = styled.div`
    width: 90vw;
    height: 30vh;
    z-index: 21;
    margin-top: 50px;
`;

const ChampionCard = styled.div`
    width: 150px;
    height: 30vh;

    &:hover {
        cursor: pointer;
    }
`;

const ChampionImage = styled.div`
    width: 150px;
    height: 100%;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
`;

const ChampionName = styled.div`
    width: 150px;
    height: 50px;
    opacity: 0.8;
    background-color: black;
    color: white;
    position: absolute;
    bottom: 0;
    font-size: 1rem;
    display: grid;
    place-items: center;
    letter-spacing: 2px;
`;


const ChampionSwiper = ({ champions }) => {
    console.log(champions);
    return (
        <SwiperContainer>
            <Swiper
                spaceBetween={10}
                slidesPerView={7}
                loop={true}
                navigation
            >
                {champions && champions.map(champion => {
                    return (
                        <SwiperSlide >
                            <ChampionCard key={champion.key}>
                                <ChampionImage bgURL={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}>
                                    <ChampionName>{champion.name}</ChampionName>
                                </ChampionImage>
                            </ChampionCard>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </SwiperContainer>
    );
}

export default ChampionSwiper;