import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #fff;
    width: 100vw;
    height: 100vh;
    padding-top: 50px;
    overflow: hidden;
`;

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    filter: blur(2px);
    overflow: hidden;
    background: url(${props => props.bgURL});
    background-position: center center;
    background-size: cover;
`;

const ChampionPresenter = ({ champions }) => {
    return (
        <>
            <Helmet>
                <title>LOLCORD 챔피언도감</title>
            </Helmet>
            <Container>
                <Background bgURL={require(`assets/runeterra.jpg`).default} />
            </Container>
        </>
    );
}

export default ChampionPresenter;
