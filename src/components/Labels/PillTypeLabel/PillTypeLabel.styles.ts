import styled from "styled-components";

const PillTypeLabelStyles = styled.label<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 100vw;
    border: 1px solid black;
    padding: .2rem 1rem;
    margin-inline: .25rem;
    font-weight: bold;
    font-size: .75rem;
`

export default PillTypeLabelStyles;