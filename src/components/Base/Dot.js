import styled from 'styled-components';
import { get } from 'roni';

const Dot = styled.span`
    color: ${get('colors.gray.5')};
    font-size: 14px;
    padding: 0 6px;
`;

export default Dot;
