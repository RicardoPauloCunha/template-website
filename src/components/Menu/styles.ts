import styled from "styled-components";

export const NavbarProfile = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5rem 0 1rem 0;

    >span {
        margin-right: 1rem;
    }

    @media (min-width: 768px) {
        margin: 0;
    }
`;