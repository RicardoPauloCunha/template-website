import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --color-white: #FFFFFF;
        --color-black: #000000;
        
        --color-gray-100: #F3F3F3;
        --color-gray-300: #858585;
    }

    body {
        background-color: var(--color-gray-100);
        width: 100%;
        height: 100%;
    }
`;