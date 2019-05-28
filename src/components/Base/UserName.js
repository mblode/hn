import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { get } from 'pikcha-frame'
import PropTypes from 'prop-types'
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

    :hover {
        color: ${get('colors.gray.6')} !important;
        text-decoration: underline;
    }

    ${active}
    ${space}
`;

UserName.propTypes = {
    parent: PropTypes.number
}


export default UserName
