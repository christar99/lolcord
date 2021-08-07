import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Background = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(${props => props.bgUrl}) no-repeat;
    background-position: center center;
    background-size: cover;
    filter: blur(2px);
    opacity: 0.8;
    z-index: 0; 
`;

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
                
const TemporaryContainer = styled.div`
    width: 70vw;
    height: 30vh;
    display: flex;
    justify-content: space-between;
    z-index: 24;
`;

const ContainerBox = styled.div`
    width: 30vw;
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 6px double black;
    border-radius: 20px;
    background-color: #fff;
    z-index: 25;
    font-size: 4rem;

    &:hover {
        background-color: skyblue;
        cursor: pointer;
    }

    @media only screen and (max-width: 1200px) {
        height: 20vh;
        font-size: 2.5rem;
    }

    @media only screen and (max-width: 768px) {
        height: 10vh;
        font-size: 1.5rem;
    }
`;


const Home = () => {
    return (
        <>
            <Background bgUrl={require(`assets/summoners_canyon.jpg`).default}/>
            <Wrap>
                <TemporaryContainer>
                    <Link to="/items">
                        <ContainerBox>아이템도감</ContainerBox>
                    </Link>
                    <Link to="/champions">
                        <ContainerBox>챔피언도감</ContainerBox>
                    </Link>
                </TemporaryContainer>
            </Wrap>
        </>
    );
}

export default Home;