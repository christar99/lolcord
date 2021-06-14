import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';
import ItemList from 'Components/Items/ItemList';
import ItemDetail from 'Components/Items/ItemDetail';
import ItemFilter from 'Components/Items/ItemFilter';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    overflow: hidden;
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

const ListContainer = styled.div`
    width: 40%;
    height: 83%;
    background-color: rgb(75,93,113);
    display: flex;
    z-index: 2;
`;


const ItemBox = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 50px 1fr;
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


const ItemDetailContainer = styled.div`
    width: 30%;
    height: 83%;
    display: flex;
    background-color: #212F3D;
    z-index: 2;
`;
const ItemPresenter = ({items, id, loading, imageURL, handleChange, searchValue, handleClick, clickedItem, handleCheck, checkedFilter }) => {
    let interSection = []
    if(searchValue !== undefined && checkedFilter !== undefined){
        interSection = searchValue.filter(value => checkedFilter.includes(value));
    }
    return (
        <Container>
            <Background bgUrl={require(`assets/Invasion_of_starGuard.jpg`).default}/>
            <ListContainer>
                <ItemFilter 
                    items={items}
                    id={id}
                    handleCheck={handleCheck}
                />
                <ItemBox>
                    <SearchBox>
                        <SearchImage bgImage={require(`assets/search.png`).default}/>
                        <Input placeholder="아이템 검색" onChange={handleChange}/>
                    </SearchBox>
                    {searchValue === undefined || searchValue === ""
                        ? (!checkedFilter || !checkedFilter.length
                            ? <ItemList // 검색도 없고 필터도 없고
                            items={items}
                            id={id}
                            loading={loading}
                            imageURL={imageURL}
                            handleClick={handleClick}
                            /> 
                            : <ItemList // 검색은 없고 필터는 있고
                            items={checkedFilter}
                            id={id}
                            loading={loading}
                            imageURL={imageURL}
                            handleClick={handleClick}
                            /> 
                        )
                        : (!checkedFilter || !checkedFilter.length
                            ? <ItemList // 검색은 있고 필터는 없고
                            items={searchValue}
                            id={id}
                            loading={loading}
                            imageURL={imageURL}
                            handleClick={handleClick}
                            />
                            : <ItemList // 검색도 있고 필터도 있고
                            items={interSection}
                            id={id}
                            loading={loading}
                            imageURL={imageURL}
                            handleClick={handleClick}
                            />  
                        )
                    }
                </ItemBox>
            </ListContainer>

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

ItemPresenter.propTypes = {
    items: Proptypes.array,
    id: Proptypes.array,
    loading: Proptypes.bool.isRequired,
    imageURL: Proptypes.string,
    handleChange: Proptypes.func,
    searchValue: Proptypes.array,
    handleClick: Proptypes.func,
    clickedItem: Proptypes.object,
    handleCheck: Proptypes.func,
    checkedFilter: Proptypes.array
}

export default ItemPresenter;

