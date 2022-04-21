import styled from "styled-components";
import { Card } from "reactstrap";

export const DataCardEl = styled(Card)`
    & + & {
        margin-top: 1rem;
    }
`;