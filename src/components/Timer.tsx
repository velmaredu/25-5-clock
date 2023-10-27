import { Pause, PlayArrow, RestartAlt } from "@mui/icons-material"
import { IconButton, Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_BREAK_MINS, DEFAULT_SESSION_MINS } from './constants'
import beep from '../assets/audio/beep.mp3'

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

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = document.getElementById('beep') as HTMLAudioElement
    }, []);

    const formatTimer = (minutes: number, seconds: number) => {
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const playSound = (audio: HTMLAudioElement | null) => {
        if (audio) {
            audio.play();
        } else {
            console.log("No audio element found");
        }
    };

    useEffect(() => {
        if (!isActive) {
            if (prevSessionMins.current !== props.sessionMins) {
                setMinutes(props.sessionMins);
                setSeconds(0);
                prevSessionMins.current = props.sessionMins
            }
            if (prevBreakMins.current !== props.breakMins) {
                prevBreakMins.current = props.breakMins
            }
        } else {
            if (prevSessionMins.current !== props.sessionMins && !isSession.current) {
                setMinutes(props.sessionMins);
                setSeconds(0);
                prevSessionMins.current = props.sessionMins
            }
            if (prevBreakMins.current !== props.breakMins && isSession.current) {
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
                        playSound(audioRef.current)
                        isSession.current = !isSession.current
                        setMinutes(isSession.current ? prevSessionMins.current : prevBreakMins.current)
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
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
        setIsActive(false)
        setSeconds(0)
        setMinutes(props.sessionMins)
        props.setSessionMins(DEFAULT_SESSION_MINS)
        props.setBreakMins(DEFAULT_BREAK_MINS)
        isSession.current = true
    }

    return (
        <Stack direction={"column"} gap={2} alignItems={'center'}>
            <Stack id='timer-block' sx={{ display: 'inline', padding: 2 }} gap={1}>
                <Typography id='timer-label'
                    variant='h3'
                    marginInline={1}>
                    {isSession.current ? "Session" : "Break"}
                </Typography>
                <Typography
                    id="time-left"
                    variant="h1">
                    {formatTimer(minutes, seconds)}
                </Typography>
            </Stack>
            <audio id='beep' src={beep} />
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