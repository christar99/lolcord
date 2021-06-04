import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
    ${reset};
    a {
        text-decoration: none;
        color: inherit;
    }

    * {
        box-sizing: border-box;
    }

    html {
        width: 100%;
        height: 100%;
    }

    body {
        font-family: 'Jua', sans-serif;
        font-size: 12px;
        padding-top: 50px;
        margin: 0;
        padding: 0;
        width: 100%; 
        height: 100%;
    }

    #root {
        width: 100%; 
        height: 100%;
    }
`;

export default globalStyles;