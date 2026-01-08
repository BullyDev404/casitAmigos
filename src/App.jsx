import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;
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
    <StyledApp>
      <H1>CasitaMigos</H1>
      <Button onClick={() => alert("button clicked")}>Check in</Button>
    </StyledApp>
  );
}

export default App;
