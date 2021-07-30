import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: pink;
    display: ${props => props.isSelected ? "flex" : "none"};
`;


const Skills = ({ champions, isSelected }) => {
    return (
        <Container isSelected={isSelected}>
        </Container>
    );
}

export default Skills;