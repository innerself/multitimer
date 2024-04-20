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


    return (
        <>
            <TimerValue>{timerValue}</TimerValue>
            <TimerControlBlock>
                <ButtonTimerToggle>START</ButtonTimerToggle>
                <ButtonTimerReset>RESET</ButtonTimerReset>
            </TimerControlBlock>
        </>
    );
}

export default Timer;
