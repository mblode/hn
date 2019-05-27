import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { space } from 'styled-system'


const active = props =>
props.parent &&
css`
    color: #f68a30;
`

const User = styled(Link)`
    font-size: 14px;
    color: #67717a;
    text-decoration: none;
    display: inline-block;

    :hover {
        color: #545e6e !important;
        text-decoration: underline;
    }

    ${active}
    ${space}
`;

User.propTypes = {
    parent: PropTypes.number
}


export default User
