import styled from 'styled-components'
import { space } from 'styled-system'
import { get } from 'pikcha-frame'

const Time = styled.span`
    margin-right: 4px;
    color: ${get('colors.gray.5')};
    font-size: 14px;
    display: inline-block;
    ${space}
`

export default Time

