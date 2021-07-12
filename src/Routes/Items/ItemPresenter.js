import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Helmet from 'react-helmet';
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

    @media only screen and (max-width: 768px) {
        align-items: normal;
    }
`;

// 설명을위한 모달창
const Modal = styled.div`
    display: ${props => props.state ? "flex" : "none"};
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 100;
    background-color: #808080;
    opacity: 0.85;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;

    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const ModalOff = styled.span`
    display: inline-block;
    position: absolute;
    left: 30vw;
    top: 3vh;
    font-size: 2rem;
`;

const ItemListModalBox = styled.div`
    width: 40vw;
    height: 83vh;
    z-index: 200;
`;

const ItemDetailModalBox = styled.div`
    width: 30%;
    height: 83%;
    z-index: 200;
`;



const ExplainModal = styled.div`
    border: 3px solid #151515;
`;

const ModalSearch = styled(ExplainModal)`
    width: calc(100% - 50px);
    height: 50px;
    margin-left: 50px;
    border-color: rgb(80 ,20 ,0);
`;

const ModalFilter = styled(ExplainModal)`
    width: 50px;
    height: calc(100% - 50px);
    border-color: rgb(80 ,20 ,0);
`;


const ModalList = styled(ExplainModal)`
    width: calc(100% - 50px);
    height: calc(100% - 50px);
    margin-left: 50px;
    top: calc(-83vh + 50px);
    position: relative;
    border-color: rgb(0, 40, 109);
`;

const ModalDetail = styled(ExplainModal)`
    width: 100%;
    height: 100%;
    border-color: rgb(0, 40, 109);
    font-size: 1.5rem;
    color: rgb(0, 40, 109);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;
//////////////////////



// 모달창 박스의 내용물들
const ExplainBox = styled.div`
    position: relative;
    color: #151515;
    font-size: 1.5rem;
`;

const ExplainSearch = styled(ExplainBox)`
    width: 30vw;
    left: 30px;
    top: 60px;
    color: rgb(80, 20, 0);
`;

const ExplainFilter = styled(ExplainBox)`
    width: 30vw;
    left: 70px;
    top: 24vh;
    color: rgb(80, 20, 0);
`;

const ExplainList = styled(ExplainBox)`
    width: 30vw;
    left: 30px;
    top: 48vh;
    color: rgb(0, 40, 109);
`;

const Arrow = styled.p`
    font-weight: 700;
    font-size: 2rem;
    display: inline-block;
`;

const Explain = styled.span``;

const ExplainBuild = styled.div`
    width: 100%;
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid rgb(0, 40, 109);
`;

const ExplainCombination = styled.div`
    width: 100%;
    height: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid rgb(0, 40, 109);
`;

const ExplainDetail = styled.div`
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
//////////////////////

// 설명창 껐을때 켜는 버튼
const ModalButton = styled.div`
    width: 50px;
    height: 50px;
    background: url(${props => props.bgURL});
    background-size: cover;
    background-position: center center;
    position: absolute;
    z-index: 200;
    top: 100px;
    right: 25px;

    &:hover {
        cursor: pointer;
        background: url(${props => props.afterbgURL});
    }
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;
/////////////////////////

const Background = styled.div`
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    background: url(${props => props.bgUrl}) no-repeat;
    background-position: center center;
    background-size: cover;
    filter: blur(2px);
    opacity: 0.8;
    z-index: 0; 
`;

const ListContainer = styled.div`
    width: 40vw;
    height: 83vh;
    background-color: rgb(75,93,113);
    display: flex;
    z-index: 2;
    
    @media only screen and (max-width: 768px) {
        width: 80vw;
        display: ${props => props.clickedItem === undefined ? "flex" : "none"};
        position: relative;
        top: 10vh;
    }
`;


const ItemBox = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 50px 1fr;

    @media only screen and (max-width: 768px) {
        grid-template-rows: 40px 1fr;
    }
`;


const SearchBox = styled.div`
    background-color: #2C3E50;
    padding-top: 8px;
    padding-left: 3%;

    @media only screen and (max-width: 768px) {
        padding-top: 5px;
    }
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

    @media only screen and (max-width: 768px) {
        height: 30px;
        padding-left: 30px;
    }
`;

const SearchImage = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    background: url(${props => props.bgImage}) no-repeat;
    margin-top: 8px;
    margin-left: 8px;

    @media only screen and (max-width: 768px) {
        width: 15px;
        height: 15px;
        margin-top: 8px;
        margin-left: 8px;
    }
`;


const ItemDetailContainer = styled.div`
    width: 30vw;
    height: 83vh;
    display: flex;
    background-color: #212F3D;
    z-index: 2;

    @media only screen and (max-width: 768px) {
        display: ${props => props.clickedItem === undefined ? "none" : "flex"};
        width: 80vw;
        height: 76vh;
        position: relative;
        top: 10vh;
    }
`;

const CloseButton = styled.div`
    display: none;
    width: 80vw;
    height: 6vh;
    background-color: rgb(235,102,45);
    position: fixed;
    bottom: 8vh;

    &:hover {
        cursor: pointer;
    }

    @media only screen and (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const ItemPresenter = ({items, id, loading, imageURL, handleChange, searchValue, 
    handleClick, clickedItem, removeClickedItem, handleCheck, checkedFilter, checkedId }) => {
    let interSection = [];
    const [modalState, setModalState] = useState(true);
    if(searchValue !== undefined && checkedFilter !== undefined){
        interSection = searchValue.filter(value => checkedFilter.includes(value));
    }

    const modalOff = () => {
        setModalState(false);
    }

    const modalOn = () => {
        setModalState(true);
    }

    return (
        <>
            <Helmet>
                <title>LOLCORD 아이템도감</title>
            </Helmet>
            <Container clickedItem={clickedItem}>
                <Modal onClick={modalOff} state={modalState}>
                    <ItemListModalBox>
                        <ModalOff>※설명창을 종료하려면 아무곳을 클릭해주세요.</ModalOff>
                        <ModalSearch>
                            <ExplainSearch>
                                <Arrow>↑</Arrow>
                                <Explain>이 부분은 검색창입니다. 검색해서 아이템을 쉽게 찾으세요.</Explain>
                            </ExplainSearch>
                        </ModalSearch>

                        <ModalFilter>
                            <ExplainFilter>
                                <Arrow>←</Arrow>
                                <Explain> 이 부분은 필터입니다. 원하는 아이템을 찾고자 할 때, 필터를 클릭해 편하게 찾으세요.</Explain>
                            </ExplainFilter>
                        </ModalFilter>

                        <ModalList>
                            <ExplainList>
                                <Explain> 아이템리스트입니다. 박스안의 아이템을 클릭하면 옆박스의 세부정보가 출력됩니다.</Explain>
                            </ExplainList>
                        </ModalList>
                    </ItemListModalBox>

                    <ItemDetailModalBox>
                        <ModalDetail>
                            <ExplainBuild> 이 아이템으로 조합할 수 있는 다른아이템들입니다.</ExplainBuild>
                            <ExplainCombination>아이템 조합식입니다. </ExplainCombination>
                            <ExplainDetail>아이템 세부정보입니다. 아이템의 능력치, 액티브와 패시브스킬등의 정보가 출력됩니다.</ExplainDetail>
                        </ModalDetail>
                    </ItemDetailModalBox>
                </Modal>

                <ModalButton 
                    onClick={modalOn} 
                    bgURL={require(`assets/explainButton-1.png`).default} 
                    afterbgURL={require(`assets/explainButton-2.png`).default}
                />

                <Background bgUrl={require(`assets/Invasion_of_starGuard.jpg`).default}/>

                <ListContainer clickedItem={clickedItem}>
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
                            ? (checkedFilter === undefined || (checkedFilter.length === 0 && checkedId.length === 0)
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
                            : (!checkedFilter || (!checkedFilter.length && !checkedId.length)
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

                <ItemDetailContainer clickedItem={clickedItem}>
                    <ItemDetail
                        items={items}
                        clickedItem={clickedItem}
                        imageURL={imageURL}
                        handleClick={handleClick}
                    />
                    <CloseButton onClick={removeClickedItem}>닫기</CloseButton>
                </ItemDetailContainer>
            </Container>
        </>
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
    checkedFilter: Proptypes.array,
    checkedId: Proptypes.array
}

export default ItemPresenter;

