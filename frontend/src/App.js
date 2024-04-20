import styled, {createGlobalStyle} from "styled-components";
// import Timer from "./components/Timer";
import timersData from "./components/timers";
import {useEffect, useState} from "react";


const GlobalStyle = createGlobalStyle``;


const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 99vh;
    width: 99vw;
`;


const Button = styled.button``;
const AddTimerInput = styled.input``;
const TimersList = styled.div``;
const TimerInfo = styled.div``;
const TimerControlBlock = styled.div``;
const ButtonTimerControl = styled.button`
    width: 15vw;
    height: 5vh;
    margin: 0.5rem;
`;


const ButtonTimerToggle = styled(ButtonTimerControl)``;
const ButtonTimerReset = styled(ButtonTimerControl)``;

const TimerValue = styled.div`
    font-size: 10rem;
`;


function nextId() {
    let maxId = -Infinity;

    for (const timer of timersData) {
        if (timer.id > maxId) {
            maxId = timer.id;
        }
    }

    return maxId + 1
}


function Timer({timerValue, setTimerValue}) {
    const TimerStates = {
        STOPPED: 'stopped',
        RUNNING: 'running',
        PAUSED: 'paused',
    }

    const [timerId, setTimerId] = useState(0);
    const [timerState, setTimerState] = useState(TimerStates.STOPPED);
    const [currValue, setCurrValue] = useState(timerValue);

    useEffect(() => {
        setCurrValue(timerValue)
    }, [timerValue]);

    function toggleTimer() {
        if (timerState === TimerStates.STOPPED) {
            setTimerState(TimerStates.RUNNING);
            const stopTime = Date.now() + currValue * 1000;

            const intervalId = setInterval(() => {
                const remainingTime = Math.floor((stopTime - Date.now()) / 1000);
                if (remainingTime <= 0) {
                    setTimerState(TimerStates.STOPPED);
                    clearInterval(intervalId);
                    setTimerId(null);
                    setTimerValue(0);
                } else {
                    setCurrValue(remainingTime);
                    setTimerValue(currValue);
                }
            }, 100);
            setTimerId(intervalId);
        } else if (timerState === TimerStates.RUNNING) {
            setTimerState(TimerStates.STOPPED);
            clearInterval(timerId);
            setTimerId(null);
            setTimerValue(currValue);
        }
    }

    return (
        <>
            <TimerValue>{currValue}</TimerValue>
            <TimerControlBlock>
                <ButtonTimerToggle onClick={toggleTimer}>
                    {timerState === TimerStates.RUNNING ? 'STOP' : 'START'}
                </ButtonTimerToggle>
                <ButtonTimerReset>RESET</ButtonTimerReset>
            </TimerControlBlock>
        </>
    );
}


function App() {
    const [timers, setTimers] = useState(timersData);
    const [timerValue, setTimerValue] = useState(0);
    const [newTimerValue, setNewTimerValue] = useState();
    
    function updateTimerValueRadio({target: {value}}) {
        setTimerValue(value);
    }

    function updateNewTimerValue({target: {value}}) {
        setNewTimerValue(value);
    }

    function addTimer() {
        if (newTimerValue !== undefined) {
            setTimers([...timers, {"value": newTimerValue, id: nextId()}]);
            setNewTimerValue(undefined);
        }
    }

    return (
        <>
            <GlobalStyle/>
            <AppContainer>
                <AddTimerInput
                    placeholder={"60"}
                    onChange={updateNewTimerValue}
                    value={newTimerValue}
                />
                <Button onClick={addTimer}>Add timer</Button>
                <TimersList>
                    {timers.map(({value, id}) => (
                        <TimerInfo key={id}>
                            <input
                                type={"radio"}
                                id={`timer-${id}`}
                                name="selectedTimer"
                                value={value}
                                onChange={updateTimerValueRadio}
                            />
                            {value}
                        </TimerInfo>
                    ))}
                </TimersList>
                <Timer timerValue={timerValue} setTimerValue={setTimerValue}/>
            </AppContainer>
        </>
    );
}

export default App;
