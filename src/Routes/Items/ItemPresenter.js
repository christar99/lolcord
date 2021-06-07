import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';
import ItemList from 'Components/ItemList';
import ItemDetail from 'Components/ItemDetail';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
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

const ItemBox = styled.div`
    width: 40%;
    height: 90%;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 50px 1fr;
    background-color: rgb(75,93,113);
    z-index: 2;
`;

const FilterClear = styled.div`
    background-color: #2C3E50;
    border-bottom: 1px solid #5D6D7E;
    border-right: 1px solid #5D6D7E;
`;

const SearchBox = styled.div`
    background-color: #2C3E50;
    padding-top: 8px;
    padding-left: 3%;
`;


const Input = styled.input`
    width: 95%;
    height: 35px;
    background-color: #212F3D;
    outline: none;
    border: 1px solid #566573;
    color: #ABB2B9;
    padding-left: 35px;
    font-size: 14px;
    ::placeholder {
        color: #808B96;
    }
`;

const SearchImage = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    background: url(${props => props.bgImage}) no-repeat;
    margin-top: 8px;
    margin-left: 8px;
`;

const Filter = styled.div`
    background-color: #2C3E50;
`;

const ItemDetailContainer = styled.div`
    width: 35%;
    height: 90%;
    display: flex;
    background-color: #212F3D;
    z-index: 2;
`;

const ItemPresenter = ({items, id, loading, imageURL, handleChange, searchValue, handleClick, clickedItem}) => {
    return (
        <Container>
            <Background bgUrl={require(`assets/Invasion_of_starGuard.jpg`).default}/>
            <ItemBox>
                <FilterClear></FilterClear>
                <SearchBox>
                    <SearchImage bgImage={require(`assets/search.png`).default}/>
                    <Input placeholder="아이템 검색" onChange={handleChange}/>
                </SearchBox>
                <Filter></Filter>
                {searchValue === undefined || searchValue === ""
                    ? <ItemList 
                        items={items}
                        id={id}
                        loading={loading}
                        imageURL={imageURL}
                        handleClick={handleClick}
                    />
                    : <ItemList 
                        items={searchValue}
                        id={id}
                        loading={loading}
                        imageURL={imageURL}
                        handleClick={handleClick}
                    />
                }
            </ItemBox>
            <ItemDetailContainer >
                <ItemDetail
                    items={items}
                    clickedItem={clickedItem}
                    imageURL={imageURL}
                    handleClick={handleClick}
                />
            </ItemDetailContainer>
        </Container>
    );
}

ItemPresenter.prototypes = {
    items: Proptypes.array,
    id: Proptypes.array,
    loading: Proptypes.bool.isRequired,
    imageURL: Proptypes.string,
    handleChange: Proptypes.func,
    searchValue: Proptypes.string,
    handleClick: Proptypes.func,
    clickedItem: Proptypes.number
}

export default ItemPresenter;

