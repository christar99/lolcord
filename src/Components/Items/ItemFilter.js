import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Filter = styled.div`
    width: 45px;
    height: 100%;
    background-color: #2C3E50;

    @media only screen and (max-width: 768px) {
        width: 35px;
    }
`;

const SpaceArea = styled.div`
    width: 45px; 
    height: 50px;
    border-right: 1px solid #5D6D7E;
    border-bottom: 1px solid #5D6D7E;

    @media only screen and (max-width: 768px) {
        width: 35px; 
        height: 40px;
    }
`;

const FilterContent = styled.ul`
    height: 100%;
`;

const FilterList = styled.li`
    height: 45px;

    @media only screen and (max-width: 768px) {
        height: 35px;
    }
`;

const Label = styled.label`

`;

const FilterImage = styled.input`
    position: absolute;
    width: 45px;
    height: 45px;
    opacity: 0;
    margin: 0;
    z-index: 0;

    @media only screen and (max-width: 768px) {
        width: 35px;
        height: 35px;
    }

    & + ${Label} {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        background: url(${props => props.bgURL}) no-repeat;
        background-size: 20px 20px;
        background-position: center center;
        background-color: '#2C3E50';
    }

    &:hover {
        cursor: pointer;
    }

    &:checked + ${Label} {
        background-color: #4F0C0C;
    }
`;



const ItemFilter = ({ items, id, handleCheck }) => {
    const filterURL = "https://poro.gg/images/lol/stats/";
    const filterInfo = [
        {
            url: "attackdamage.svg",
            id: "Damage",
            title: "공격력",
            isClicked: false
        },
        {
            url: "criticalstrike.svg",
            id: "CriticalStrike",
            title: "치명타",
            isClicked: false
        },
        {
            url: "attackspeed.svg",
            id: "AttackSpeed",
            title: "공격속도",
            isClicked: false
        },
        {
            url: "onhiteffects.svg",
            id: "OnHit",
            title: "적중 시 효과",
            isClicked: false
        },
        {
            url: "armorpenetration.svg",
            id: "ArmorPenetration",
            title: "방어구 관통력",
            isClicked: false
        },
        {
            url: "abilitypower.svg",
            id: "SpellDamage",
            title: "주문력",
            isClicked: false
        },
        {
            url: "mana.svg",
            id: "Mana",
            title: "마나 및 재생",
            isClicked: false
        },
        {
            url: "magicpenetration.svg",
            id: "MagicPenetration",
            title: "마법 관통력",
            isClicked: false
        },
        {
            url: "healthscaling.svg",
            id: "Health",
            title: "체력 및 재생",
            isClicked: false
        },
        {
            url: "armor.svg",
            id: "Armor",
            title: "방어력",
            isClicked: false
        },
        {
            url: "magicresion.svg",
            id: "SpellBlock",
            title: "마법 저항력",
            isClicked: false
        },
        {
            url: "scdrscaling.svg",
            id: "CooldownReduction",
            title: "스킬가속",
            isClicked: false
        },
        {
            url: "movementspeed.svg",
            id: "NonbootsMovement",
            title: "이동속도",
            isClicked: false
        },
        {
            url: "lifesteal.svg",
            id: "LifeSteal",
            title: "생명력 흡수 및 흡혈",
            isClicked: false
        }
    ];

    return (
        <Filter>
            <SpaceArea />
            <FilterContent>
                {filterInfo.map(token => {
                    return (
                        <FilterList key={token.id}>
                            <FilterImage
                                type="checkbox"
                                bgURL={`${filterURL}${token.url}`} 
                                id={token.id}
                                onChange={handleCheck}
                                title={token.title}
                            />
                            <Label
                                htmlfor={token.id}
                            />
                        </FilterList>
                    );
                })}
            </FilterContent>
        </Filter>
    );
}

ItemFilter.propTypes = {
    items: PropTypes.array,
    id: PropTypes.array,
    handleCheck: PropTypes.func
}

export default ItemFilter;