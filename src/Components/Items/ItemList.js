import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';

const Items = styled.div`
    width: 100%; 
    height: 100%;
    background-color: #212F3D;
    overflow-y: auto;
    padding: 20px;

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

const Title = styled.div`
    font-size: 20px;
    color: #EAECEE;
    margin-bottom: 20px;
    display: ${props => props.checkGroup > 0 ? "block" : "none"};
`;

const Section = styled.div`
    display: ${props => props.checkGroup > 0 ? "grid" : "none"};
    grid-template-columns: repeat(auto-fill, 40px);
    grid-gap: 15px;
    margin-bottom: 50px;

    
    @media only screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, 30px);
        grid-gap: 10px;
    }
`;

const ItemName = styled.span`
    display: none;
    position: absolute;
    padding: 10px;
    background-color: #050D15;
    color: #D5D8DC;
    opacity: 0.95;
    font-size: 14px;
`;

const Start = styled.div`
    // 이거쓰면 화면이 불안정. 흔들림
    /* &:hover ${ItemName} {
        display: block;
    } */
`;


const ItemImage = styled.button`
    background: url(${props => props.bgurl});
    background-size: cover;
    background-position: center center;
    width: 40px;
    height: 40px;
    border: none;
    &:hover {
        cursor: pointer;
    }
    &:focus {
        border: 2px solid #AED6F1;
    }

    @media only screen and (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`;

const ItemGold = styled.span`
    color: #EAECEE;
    display: flex;
    justify-content: center;
    margin-top: 5px;
/* 
    @media only screen and (max-width: 768px) {
        display: inline;
    } */
`;

const ItemList = ({ items, id, loading, imageURL, handleClick}) => {
    const checkGroup = groupName => {
        let result = items.filter(item => item.group === groupName);
        return result;
    }

    return (
        <>
            {loading ? <Loader />
                : <Items>
                    <Title checkGroup={checkGroup("start").length} >시작</Title>
                    <Section checkGroup={checkGroup("start").length}>
                        {items.map(item => {
                            return item.group === "start" &&
                                <Start key={item.image.full}>
                                    <ItemImage title={item.name} id={item.image.full} bgurl={imageURL + item.image.full} onClick={handleClick}/>
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })} 
                    </Section>  

                    <Title checkGroup={checkGroup("basic").length} >기본</Title>
                    <Section checkGroup={checkGroup("basic").length}>
                        {items.map(item => {
                            return item.group === "basic" &&
                                <Start key={item.image.full}>
                                    <ItemImage title={item.name} id={item.image.full} bgurl={imageURL + item.image.full}  onClick={handleClick}/>
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })}
                    </Section>

                    <Title checkGroup={checkGroup("epic").length} >서사급</Title>
                    <Section checkGroup={checkGroup("epic").length}>
                        {items.map(item => {
                            return item.group === "epic" &&
                                <Start key={item.image.full}>
                                    <ItemImage title={item.name} id={item.image.full} bgurl={imageURL + item.image.full}  onClick={handleClick}/>
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })}
                    </Section>

                    <Title checkGroup={checkGroup("legend").length} >전설급</Title>
                    <Section checkGroup={checkGroup("legend").length}>
                        {items.map(item => {
                            return item.group === "legend" &&
                                <Start key={item.image.full}>
                                    <ItemImage title={item.name} id={item.image.full} bgurl={imageURL + item.image.full}  onClick={handleClick}/>
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })}
                    </Section>

                    <Title checkGroup={checkGroup("myth").length} >신화급</Title>
                    <Section checkGroup={checkGroup("myth").length}>
                        {items.map(item => {
                            return item.group === "myth" &&
                                <Start key={item.image.full}>
                                    <ItemImage title={item.name} id={item.image.full} bgurl={imageURL + item.image.full}  onClick={handleClick}/>
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })}
                    </Section>

                </Items>
            }
        </>
    );
}

ItemList.propTypes = {
    items: PropTypes.array,
    id: PropTypes.array,
    loading: PropTypes.bool,
    imageURL: PropTypes.string,
    handleClick: PropTypes.func
}


export default ItemList;


