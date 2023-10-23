import { Pause, PlayArrow, RestartAlt } from "@mui/icons-material"
import { IconButton, Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from 'react'

type CounterProps = {
    sessionMins: number
    breakMins: number
}

function Timer(props: CounterProps) {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const isSession = useRef(true)

    const formattedValue = formatTimer(minutes, seconds);

    useEffect(() => {
        setMinutes(props.sessionMins)
        setSeconds(0)
    }, [props.sessionMins])

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
    }, [isActive, minutes, seconds, props.sessionMins, props.breakMins])


    const startTimer = () => {
        if (isActive) return
        setIsActive(true)
    }

    const stopTimer = () => {
        if (isActive) {
            setIsActive(false)
        }
    }

    const resetTimer = () => {
        setIsActive(false)
        setSeconds(0)
        setMinutes(props.sessionMins)
    }

    return (
        <Stack direction={"column"} gap={2}>
            <Typography
                id="timer-label"
                variant="h2">
                {formattedValue}
            </Typography>
            <Stack direction={'row'} justifyContent={'center'} gap={3}>
                <IconButton color='inherit' onClick={startTimer}>
                    <PlayArrow fontSize="large" />
                </IconButton>
                <IconButton color='inherit' onClick={stopTimer}>
                    <Pause fontSize="large" />
                </IconButton>
                <IconButton color='inherit' onClick={resetTimer}>
                    <RestartAlt fontSize="large" />
                </IconButton>
            </Stack>
        </Stack>
    )
}

function formatTimer(minutes: number, seconds: number) {
    if (typeof minutes !== 'number' || isNaN(minutes) || isNaN(seconds)) {
        return '00:00'
    }

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${formattedMinutes}:${formattedSeconds}`
}

export default Timer