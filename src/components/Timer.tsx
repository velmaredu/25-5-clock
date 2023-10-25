import { Pause, PlayArrow, RestartAlt } from "@mui/icons-material"
import { IconButton, Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_BREAK_MINS, DEFAULT_SESSION_MINS } from './constants'

type CounterProps = {
    sessionMins: number
    breakMins: number
    setSessionMins: (value: number) => void
    setBreakMins: (value: number) => void
}

function Timer(props: CounterProps) {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(props.sessionMins)
    const [isActive, setIsActive] = useState(false)
    const isSession = useRef(true)
    const prevSessionMins = useRef(props.sessionMins);
    const prevBreakMins = useRef(props.breakMins);

    const formatTimer = (minutes: number, seconds: number) => {
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        if (!isActive) {
            if (prevSessionMins.current !== props.sessionMins) {
                setMinutes(props.sessionMins);
                setSeconds(0);
                prevSessionMins.current = props.sessionMins
            }
            if (prevBreakMins.current !== props.breakMins) {
                setMinutes(props.breakMins);
                setSeconds(0);
                prevBreakMins.current = props.breakMins
            }
        }
    }, [props.sessionMins, props.breakMins, isActive]);

    useEffect(() => {
        const intervalTime = 1000
        let interval: number;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        isSession.current = !isSession.current
                        setMinutes(isSession.current ? props.sessionMins : props.breakMins);
                    } else {
                        setSeconds(59)
                        setMinutes(minutes - 1)
                    }
                } else {
                    setSeconds(seconds - 1)
                }
            }, intervalTime)
        }

        return () => {
            clearInterval(interval)
        };
    }, [isActive, minutes, seconds])


    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false)
        setSeconds(0)
        setMinutes(props.sessionMins)
        props.setSessionMins(DEFAULT_SESSION_MINS)
        props.setBreakMins(DEFAULT_BREAK_MINS)
        isSession.current = true
    }

    return (
        <Stack direction={"column"} gap={2}>
            <Typography id='timer-label'
                variant='h2'>
                {isSession.current ? "Session" : "Break"}
            </Typography>
            <Typography
                id="time-left"
                variant="h2">
                {formatTimer(minutes, seconds)}
            </Typography>
            <Stack direction={'row'} justifyContent={'center'} gap={3}>
                <IconButton id="start_stop" color="inherit" onClick={toggleTimer}>
                    {isActive ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                </IconButton>
                <IconButton id='reset' color='inherit' onClick={resetTimer}>
                    <RestartAlt fontSize="large" />
                </IconButton>
            </Stack>
        </Stack>
    )
}

export default Timer