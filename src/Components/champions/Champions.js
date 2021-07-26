import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Container = styled.div`
    color: white;
    width: 80vw;
    height: 40vh;
    z-index: 21;
    font-size: 1.5rem;
`;

const ChampionListContainer = styled.div`
    width: 100%;
    height: 90%;
    margin-top: 10px;
    background-color: #212F3D;
    padding-bottom: 10px;
`;

const SearchContainer = styled.div`
    width: 100%;
    height: 50px;
    display: grid;
    grid-template-columns: 75% 25%;
    background-color: #2C3E50;
`;

const SearchBox = styled.div`
    height: 50px;
    padding-top: 8px;
    padding-left: 3%;
`;

const SearchImage = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    background: url(${props => props.bgImage}) no-repeat;
    margin-top: 8px;
    margin-left: 8px;
`;

const Input = styled.input`
    width: 50%;
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

const Filter = styled.div`
    display: grid;
    place-items: center;
    height: 50px;
`;

const ListContainer = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    display: grid;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-gap: 10px;
    overflow-y: auto;
    justify-content: center;
    padding-top: 10px;

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


const ChampionProperty = styled.div`
    width: 70px;
    height: 70px;
    background: url(${props => props.bgURL});
    background-size: cover;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;

    &:hover {
        cursor: pointer;
        border: 1px solid skyblue;
    }
`;

const ChampionName = styled.span`
    font-size: 0.8rem;
    margin-top: 75px;
    white-space: pre;
    &:hover {
        cursor: default;
    }
`;


const Champions = ({ version, champions, selectedGroup, group, searchChampions, searchValue, clickChampion }) => {

    // 검색한챔피언을 목록에 출력
    if(champions !== undefined) {
        champions = champions.filter(champion => champion.name.includes(searchValue) || champion.id.toLowerCase().includes(searchValue.toLowerCase()));
    }

    
    // 필터옵션
    const filterOptions = [
        {value: 'All', label: '모든 챔피언'},
        {value: 'Tank', label: '탱커'},
        {value: 'Fighter', label: '전사'},
        {value: 'Mage', label: '마법사'},
        {value: 'Assassin', label: '암살자'},
        {value: 'Marksman', label: '원거리딜러'},
        {value: 'Support', label: '서포터'}
    ]

    // 필터 CSS
    const filterStyle = {
        control: (base, state) => ({
            ...base,
            width: "15vw",
            height: 25,
            minWidth: 150,
            background: "#212F3D",
            border: "none",
            margin: 0,
            borderRadius: 0,
            fontSize: "1rem",
            fontFamily: "system-ui",
            fontWeight: 700
        }),

        menu: base => ({
            ...base,
            background: "#212F3D",
            color: "#ABB2B9",
            borderRadius: 0,
            fontSize: "1rem",
            fontFamily: "system-ui",
            fontWeight: 700
        }),

        menuList: base => ({
            ...base,
            borderRadius: 0
        }),

        singleValue: base => ({
            ...base,
            color: "#ABB2B9"
        }),

        input: base => ({
            color: "#ABB2B9"
        })
    }

    return (
        <Container>
            챔피언목록
            <ChampionListContainer>
                {/* 검색창과 필터창 */}
                <SearchContainer>
                    <SearchBox>
                        <SearchImage bgImage={require(`assets/search.png`).default}/>
                        <Input placeholder="챔피언 검색" onChange={searchChampions}/>
                    </SearchBox>
                    <Filter>
                        <Select 
                            options={filterOptions} 
                            styles={filterStyle} 
                            defaultValue={{value: "All", label: "모든챔피언"}}
                            onChange={selectedGroup}
                        />
                    </Filter>
                </SearchContainer>

                {/* 챔피언리스트 */}
                
                    <ListContainer>
                        {version && champions && champions.map(champion => {
                            return (
                                <ChampionProperty 
                                    bgURL={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`} 
                                    key={champion.key}
                                    onClick={() => clickChampion(champion.key)}
                                >
                                    <ChampionName>{champion.name}</ChampionName>
                                </ChampionProperty>
                            )
                        })}
                    </ListContainer>
            </ChampionListContainer>
        </Container>
    );
}

export default Champions;