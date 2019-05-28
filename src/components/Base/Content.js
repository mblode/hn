import styled from 'styled-components'
import { get } from 'pikcha-frame'

const Content = styled.div`
    margin-right: 4px;
    margin-bottom: 8px;
    width: 100%;

    p {
        margin-bottom: 8px;
    }

    a {
        color: ${get('colors.gray.6')};
        text-decoration: underline;
        word-wrap: break-word;
        word-break: break-all;
    }

    pre {
        overflow-x: auto;
        word-wrap: break-word;
        text-align: justify;
    }
`

export default Content;
