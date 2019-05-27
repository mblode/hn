import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const active = props =>
props.parent &&
css`
    color: #f68a30;
`

const User = styled(Link)`
    font-size: 14px;
    color: #67717a;
    text-decoration: none;

    :hover {
        color: #545e6e !important;
        text-decoration: underline;
    }

    ${active}
`;

User.propTypes = {
    parent: PropTypes.number
}


export default User
