import styled, { css } from "styled-components";
import { Alert } from "reactstrap";

export const WarningEl = styled(Alert)`
    margin: 1rem 0;
    display: none;

    ${props => props.$showWarning && css`
        display: flex;
    `};
`;