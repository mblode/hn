import styled from 'styled-components'
import { get } from 'roni'

const Content = styled.div`
    color: ${get('colors.gray.7')};
    width: 100%;
    word-wrap: break-word;

    p {
        margin-bottom: 8px;
    }

    a {
        color: ${get('colors.gray.7')};
        text-decoration: underline;
        word-wrap: break-word;
        word-break: break-all;
        transition: color 0.15s ease-in-out;
    }

    a:hover {
        color: ${get('colors.gray.8')};
    }

    a:active {
        color: ${get('colors.gray.8')};
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
