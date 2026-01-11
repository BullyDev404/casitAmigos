import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";


const Button = styled.button`
  font-size: 1.4 rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
`;
const StyledApp = styled.div`
  background-color: red;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />

      <StyledApp>
        <Heading type = 'h1'>CasitaMigos</Heading>
        <Button onClick={() => alert("button clicked")}>Check in</Button>
        <Heading type = 'h2'>CasitaMigos</Heading>
      </StyledApp>

    </>
  );
}

export default App;
