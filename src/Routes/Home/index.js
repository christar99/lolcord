import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

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

const Title = styled.h1`
    font-size: 90px;
    margin-top: 300px;
    text-shadow: 3px 3px rgb(132,132,132);
`;

const Input = styled.input`
    margin-top: 40px;
    padding: 10px;
    width: 550px;
    height: 40px;
    border-radius: 15px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    box-shadow: 3px 3px rgb(0, 0, 0);

    &:focus {
        outline: none;
    }
`;
const Button = styled.button`
    width: 50px;
    height: 30px;
    margin-left: 490px;
    margin-top: -35px;
    border: none;
    background-color: rgb(235,102,45);
    border-radius: 15px;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 2px 2px rgb(100, 100, 100);

    &:hover {
        cursor: pointer;
    }
`;

const Home = () => {
    return (
        <>
            <Background bgUrl={require(`assets/summoners_canyon.jpg`).default}/>
            {/* <Container>
                <Title>LOLCORD</Title>
                <Input placeholder="소환사이름을 검색하세요!"></Input>
                <Button>GO!</Button>
            </Container> */}
        </>
    );
}

export default Home;