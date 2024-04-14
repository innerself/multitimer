import {useState} from "react";
import styled from "styled-components";

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


function Timer() {
    const [timerValue, setTimerValue] = useState(0);
    const [timerId, setTimerId] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const timerToggle = () => {
        const increaseValue = () => {
            setTimerValue((currentValue) => currentValue + 1);
        }
        if (timerRunning) {
            setTimerRunning(false);
            clearInterval(timerId);
        } else {
            setTimerId(setInterval(increaseValue, 1000));
            setTimerRunning(true);
        }
    }
    const timerReset = () => {
        clearInterval(timerId);
        setTimerRunning(false);
        setTimerId(0);
        setTimerValue(0);
    }

    return (
        <>
            <TimerValue>{timerValue}</TimerValue>
            <TimerControlBlock>
                <ButtonTimerToggle
                    onClick={timerToggle}>
                    {timerRunning ? 'STOP' : 'START'}
                </ButtonTimerToggle>
                <ButtonTimerReset onClick={timerReset}>RESET</ButtonTimerReset>
            </TimerControlBlock>
        </>
    );
}

export default Timer;
