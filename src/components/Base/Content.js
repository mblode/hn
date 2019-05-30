import styled from 'styled-components'
import { get } from 'pikcha-frame'

const Content = styled.div`
    color: ${get('colors.gray.7')};
    width: 100%;

    p {
        margin-bottom: 8px;
    }

    a {
        color: ${get('colors.gray.7')};
        text-decoration: underline;
        word-wrap: break-word;
        word-break: break-all;
    }

    pre {
        overflow-x: auto;
        word-wrap: break-word;
        text-align: justify;
    }

    *:last-child {
        margin-bottom: 0;
    }
`

export default Content;
