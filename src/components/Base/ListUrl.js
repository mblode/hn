import styled from 'styled-components'
import { get } from 'pikcha-frame'

const ListUrl = styled.span`
    font-size: 14px;
    color: ${get('colors.gray.5')};
    width: 50px;
    font-weight: 400;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    transition: color 0.15s ease-in-out;

    :hover {
        color: ${get('colors.gray.6')};
        text-decoration: underline;
    }

    :active {
        color: ${get('colors.gray.7')};
        text-decoration: underline;
    }
`

export default ListUrl
