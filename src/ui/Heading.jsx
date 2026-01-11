import styled,{cssn} from "styled-components";

// const test = "text-align: center"

const Heading = styled.h1`
${props => props.type === "h1" && css`
    font-size: 20px;
    font-weight:600;
`}
  font-size: 20px;
  font-weight: 600;
  background-color: yellow;

`;

export default Heading;

