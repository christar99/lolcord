import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: 3rem;
    background-color: #212F3D;
    color: #EAECEE;
    padding-top: 100px;
    font-style: "sans-serif";
`;

const Loader = () => {
    return (
      <Loading>Loading...</Loading>  
    );
}

export default Loader;