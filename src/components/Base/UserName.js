import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { get } from 'pikcha-frame'
import { space } from 'styled-system'

const active = props =>
props.parent &&
css`
    color: #f68a30;
`

const UserName = styled(Link)`
    font-size: 14px;
    color: ${get('colors.gray.5')};
    text-decoration: none;
    display: inline-block;
    transition: color 0.15s ease-in-out;

    :hover {
        color: ${get('colors.gray.6')};
        text-decoration: underline;
    }

    :active {
        color: ${get('colors.gray.7')};
        text-decoration: underline;
    }

    ${active}
    ${space}
`;


export default UserName
