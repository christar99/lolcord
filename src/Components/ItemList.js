import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'Components/Loader';

const Items = styled.div`
    background-color: #212F3D;
    overflow-y: scroll;
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
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 40px);
    grid-gap: 15px;
    margin-bottom: 50px;
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
        display: inline;
    } */
`;


const ItemImage = styled.div`
    background: url(${props => props.bgurl});
    background-size: cover;
    background-position: center center;
    width: 40px;
    height: 40px;
    
    &:hover {
        cursor: pointer;
    }
`;

const ItemGold = styled.span`
    color: #EAECEE;
    display: flex;
    justify-content: center;
    margin-top: 5px;
`;


const imageURL = "http://ddragon.leagueoflegends.com/cdn/11.11.1/img/item/";

const ItemList = ({ items, keys, loading }) => {
    const checkGroup = groupName => {
        let result = items.filter(item => item.group === groupName);
        return result;
    }
    return (
        <>
            {loading ? <Loader />
                : <Items>
                    {checkGroup("start").length > 0 && <Title>시작</Title>}
                    <Section>
                        {items.map(item => {
                            return item.group === "start" &&
                                <Start>
                                    <ItemImage bgurl={imageURL + item.image.full} />
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })}
                    </Section>

                    {checkGroup("basic").length > 0 && <Title>기본</Title>}
                    <Section>
                        {items.map(item => {
                            return item.group === "basic" &&
                                <Start>
                                    <ItemImage bgurl={imageURL + item.image.full} />
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })}
                    </Section>

                    {checkGroup("epic").length > 0 && <Title>서사급</Title>}
                    <Section>
                        {items.map(item => {
                            return item.group === "epic" &&
                                <Start>
                                    <ItemImage bgurl={imageURL + item.image.full} />
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })}
                    </Section>

                    {checkGroup("legend").length > 0 && <Title>전설급</Title>}
                    <Section>
                        {items.map(item => {
                            return item.group === "legend" &&
                                <Start>
                                    <ItemImage bgurl={imageURL + item.image.full} />
                                    <ItemGold>{item.gold.total}</ItemGold>
                                    <ItemName>{item.name}</ItemName>
                                </Start>
                        })}
                    </Section>

                    {checkGroup("myth").length > 0 && <Title>신화급</Title>}
                    <Section>
                        {items.map(item => {
                            return item.group === "myth" &&
                            <Start>
                                    <ItemImage bgurl={imageURL + item.image.full} />
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
    keys: PropTypes.array,
    loading: PropTypes.bool
}


export default ItemList;


