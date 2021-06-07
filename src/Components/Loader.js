import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
    display: flex;
    justify-content: center;
    font-size: 30px;
    background-color: #212F3D;
    color: #EAECEE;
    padding-top: 50px;
`;

const Loader = () => {
    return (
      <Loading>😀Loading😀</Loading>  
    );
}

export default Loader;