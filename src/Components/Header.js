import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { versionAPI } from 'API';


const Container = styled.header`
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: rgb(235,102,45);
    position: absolute;
    z-index: 20;
    opacity: 0.8;
`;
const Title = styled.span`
    margin-left: 20px;
    font-size: 30px;
`;

const Version = styled.div`
    margin: 0;
    float: right;
    margin-right: 30px;
    font-size: 14px;
`;

const Content = styled.div`
    display: inline-block;
    margin-left: 20px;
    font-size: 16px;


`;

const Items = styled.span`
    &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }
`;

const Champions = styled.span`
    &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }
`;

const Lanking = styled.span`
    &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }
`;

const Devider = styled.span`
    font-size: 14px;
`;



const Header = () => {
    const [version, setVersion] = useState();
    const fetchData = async () => {
        const result = await versionAPI;
        setVersion(result.data[0])
    }
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Container>
            <Title><Link to="/">LOLCORD</Link></Title>
            <Content>
                <Link to="/items"><Items>아이템도감</Items></Link>
                <Devider> | </Devider> 
                <Link to="/champions"><Champions>챔피언도감</Champions></Link>
                {/* <Devider> | </Devider> 
                <Link to="/lanking"><Lanking>랭킹</Lanking></Link> */}
            </Content>
            <Version>Version {version}</Version>
        </Container>
    )
}

export default Header;
