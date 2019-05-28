import styled from 'styled-components'
import { get } from 'pikcha-frame'

const Wrap = styled.div`
    background-color: white;
    border-radius: 6px;
    box-shadow: ${get('shadows.md')};
    padding: 24px 24px;
    text-align: ${props => props.align};

    @media (max-width: 768px) {
        padding: 24px 16px;
        border-left: none;
        border-right: none;
        border-radius: 0;
    }
`

Wrap.defaultProps = {
    align: 'left'
}

export default Wrap
