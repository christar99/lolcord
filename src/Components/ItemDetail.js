import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
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

const ItemRecipe = styled.div`

`;

const Contents = styled.div`
    margin-top: 30px;
    width: 100%;
`;

const ContentImage = styled.div`
    width: 35px;
    height: 35px;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
    position: absolute;
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
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 1px;
    margin-top: 20px;
`;

const Rules = styled.span`
    color: #5499C7;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -1px;
    font-style: italic;
    font-family: sans-serif;
`;


const ItemDetail = ({ items, clickedItem, imageURL, handleClick }) => {
    let intoItem = [];
    if(clickedItem !== undefined && 'into' in clickedItem) {
        intoItem = clickedItem.into;
    }

    return (
        <Container>
            <BuildTitle>아이템 빌드</BuildTitle>
            <ItemBuild>
                {intoItem && intoItem.map(item => {
                    return <IntoItem id={`${item}.png`} bgURL={`${imageURL}${item}.png`} onClick={handleClick} />
                })}
            </ItemBuild>
            <ItemRecipe>
                {/* {clickedItem && console.log(JSON.parse(clickedItem.description))} */}
                {/* {clickedItem && console.log(clickedItem.description)} */}
            </ItemRecipe>
            <Contents>
                {
                    clickedItem && 
                    <>
                        <ContentImage bgURL={`${imageURL}${clickedItem.image.full}`} />
                        <ItemTitle>
                            {clickedItem.name}
                            <ItemGold><CoinImg bgURL={require(`assets/coin.png`).default}/> {clickedItem.gold.total}</ItemGold>
                        </ItemTitle>

                        {console.log(clickedItem)}
                        <Description>
                            {clickedItem.description.map(token => <> {token}<br/> </>)}
                            {clickedItem.rules && <Rules>{clickedItem.rules}</Rules>}
                            {clickedItem.flavorText && <Rules>{clickedItem.flavorText}</Rules>}
                        </Description>
                    </>
                }
            </Contents>
        </Container>
    );
}

export default ItemDetail;