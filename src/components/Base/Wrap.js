import { get } from 'pikcha-frame'
import styled, { css } from 'styled-components'

const flex = props =>
props.flex &&
css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Wrap = styled.div`
    background-color: white;
    border-radius: ${get('radii.2')}px;
    box-shadow: ${get('shadows.md')};
    padding: 24px 24px;
    text-align: ${props => props.align};
    min-height: ${props => props.minHeight ? "calc(100vh - 92px)" : "auto"};

    @media (max-width: 768px) {
        padding: 24px 16px;
        border-left: none;
        border-right: none;
        border-radius: 0;
        border-bottom: 1px solid ${get('colors.gray.3')};
        box-shadow: none;
        min-height: ${props => props.minHeight ? "calc(100vh - 60px)" : "auto"};
    }

    ${flex}
`

Wrap.defaultProps = {
    align: 'left'
}

export default Wrap
