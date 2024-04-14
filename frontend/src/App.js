import styled, {createGlobalStyle} from "styled-components";
import Timer from "./components/Timer";


const GlobalStyle = createGlobalStyle``;


const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 99vh;
    width: 99vw;
`;



function App() {
    return (
        <>
            <GlobalStyle/>
            <AppContainer>
                <Timer/>
            </AppContainer>
        </>
    );
}

export default App;
