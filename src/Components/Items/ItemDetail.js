import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

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

const ItemBuild = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 40px);
    grid-gap: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ABB2B9;
`;

const BuildTitle = styled.div`
    color: #EAECEE;
    font-size: 16px;
    margin-bottom: 20px;
`;

const IntoItem = styled.div`
    width: 35px;
    height: 35px;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
    &:hover {
        cursor: pointer;
    }
`;
const RecipeTitle = styled.span`
    color: #EAECEE;
    font-size: 16px;
    margin-top: 20px;
`;

const ItemRecipe = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0px;
    border-bottom: 1px solid #ABB2B9;
`;


const ItemImage = styled.div`
    width: 35px;
    height: 35px;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;

    &:hover {
        cursor: pointer;
    }
`;

const ClickedItem = styled.div`
    padding: 15px 0px;
    position: relative;
    ::after {
        content: "";
        width: 1px;
        height: 15px;
        background-color: #5D6D7E;
        left: 17px;
        position: absolute;
    }
`;

const BaseItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;
    ::before {
        content: "";
        width: ${props => {
            if(props.length === 1) return '0';
            else if(props.length === 2) return '50%';
            else  return '66.6%';
        }};
        height: 1px;
        background-color: #5D6D7E;
        top: 1px;
        position: absolute;
    }
`;

const FromItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${props => {
        if(props.length === 1) return '100%';
        else if(props.length === 2) return '50%';
        else return '33.333%';
    }};
`;

const FirstFromItem = styled.div`
    padding: 15px 0px;
    position: relative;
    ::before {
        content: "";
        width: 1px;
        height: 15px;
        background-color: #5D6D7E;
        left: 17px;
        top: 0px;
        position: absolute;
    }
    ::after {
        content: "";
        width: 1px;
        height: ${props => {
            if(props.length === undefined) return 0;
            else return '15px';
        }};
        background-color: #5D6D7E;
        left: 17px;
        position: absolute;
    }
    div {
        position: relative;
        ::after {
            content: "";
            width: ${props => {
                if(props.length === undefined) return 0;
                else if (props.length === 1) return 0;
                else if (props.length === 2) return '160%';
                else return '315%';
            }};
            height: 1px;
            background-color: #5D6D7E;
            left: ${props => {
                if(props.length === 2) return '-30%';
                else return '-108%';
            }};
            bottom: -16px;
            position: absolute;
        }
    }
`;

const SecondFromItem = styled.div`
    padding: 15px 0px;
    display: flex;
    justify-content: space-between;
    position: relative;

    div {
        margin: 0px 10px;
        position: relative;
        ::before {
            content: "";
            width: 1px;
            height: 13px;
            background-color: #5D6D7E;
            left: 17px;
            top: -15px;
            position: absolute;
        }
    }
`;

const Contents = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const ContentImage = styled.div`
    width: 35px;
    height: 35px;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
    border: 2px solid #AED6F1;
`;

const ItemTitle = styled.span`
    font-size: 16px;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 45px;
    color: #EAECEE;
    margin-top: -33px;
`;

const ItemGold = styled.span`
    font-size: 15px;
    color: #F5B041;
`;
const CoinImg = styled.div`
    width: 14px;
    height: 14px;
    display: inline-block;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
`;

const Description = styled.div`
    color: #CCD1D1;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 1px;
    margin-top: 20px;
`;

const DescriptionContent = styled.div``;

const Rules = styled.span`
    color: #5499C7;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -1px;
    font-style: italic;
    font-family: sans-serif;
`;


const ItemDetail = ({ items, clickedItem, imageURL, handleClick }) => {
    let intoItem, fromItem, baseItemInfo, baseItem = [];

    if(clickedItem !== undefined && 'into' in clickedItem) {
        intoItem = clickedItem.into;
    }

    if(clickedItem !== undefined && 'from' in clickedItem) {
        baseItem = clickedItem.from;
        baseItemInfo = baseItem.map(item => items.filter(token => token.image.full.substring(0, 4).includes(item))[0]);
        fromItem = baseItemInfo.map(item => item.from && item.from);
    }

    return (
        <Container>
            <BuildTitle>아이템 빌드</BuildTitle>
            <ItemBuild>
                {intoItem && intoItem.map(item => {
                    return <IntoItem id={`${item}.png`} bgURL={`${imageURL}${item}.png`} onClick={handleClick} />
                })}
            </ItemBuild>
            {clickedItem && Object.keys(clickedItem).includes('from') && 
                    <>
                        <RecipeTitle> 아이템조합식 </RecipeTitle>
                    <ItemRecipe>
                        <ClickedItem>
                            <ItemImage bgURL={`${imageURL}${clickedItem.image.full}`}/>
                        </ClickedItem>
                        {clickedItem.from && 
                        <BaseItem length={baseItem.length}>
                            {baseItemInfo.map(item => {
                                return (
                                    <FromItem length={baseItem.length}>
                                        <FirstFromItem length={item.from && item.from.length}>
                                            <ItemImage length={fromItem} id={item.image.full} bgURL={`${imageURL}${item.image.full}`} onClick={handleClick} />
                                        </FirstFromItem>
                                        <SecondFromItem>
                                        {item.from && item.from.map(token => {
                                            return (
                                                <IntoItem id={`${token}.png`} bgURL={`${imageURL}${token}.png`} onClick={handleClick} />
                                                );
                                            })}
                                        </SecondFromItem>
                                    </FromItem>
                                );
                            })}
                        </BaseItem>
                        }
                    </ItemRecipe>
                </>
            }
            <Contents>
                {
                    clickedItem && 
                    <>
                        <ContentImage bgURL={`${imageURL}${clickedItem.image.full}`} />
                        <ItemTitle>
                            {clickedItem.name}
                            <ItemGold><CoinImg bgURL={require(`assets/coin.png`).default}/> {clickedItem.gold.total}</ItemGold>
                        </ItemTitle>

                        <Description>
                            {clickedItem.description.map(token => <DescriptionContent> {token}<br/> </DescriptionContent>)}
                            {clickedItem.rules && <Rules>{clickedItem.rules}</Rules>}
                            {clickedItem.flavorText && <Rules>{clickedItem.flavorText}</Rules>}
                        </Description>
                    </>
                }
            </Contents>
        </Container>
    );
}

ItemDetail.propTypes ={
    items: PropTypes.array,
    clickedItem: PropTypes.object,
    imageURL: PropTypes.string,
    handleClick: PropTypes.func
};
export default ItemDetail;