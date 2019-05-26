import styled from 'styled-components'

const ListUrl = styled.span`
    font-size: 14px;
    color: #67717a;
    width: 50px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;

    &:hover {
        text-decoration: underline;
    }
`

export default ListUrl
