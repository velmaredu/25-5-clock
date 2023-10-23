import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'

function App() {
  const [breakMins, setBreakMins] = useState(5);
  const [sessionMins, setSessionMins] = useState(25);

  const handleBreakDecrease = () => {
    if (breakMins > 1)
      setBreakMins(breakMins - 1);
  };

  const handleBreakIncrease = () => {
    setBreakMins(breakMins + 1);
  };

  const handleSessionDecrease = () => {
    if (sessionMins > 1)
      setSessionMins(sessionMins - 1);
  };

  const handleSessionIncrease = () => {
    setSessionMins(sessionMins + 1);
  };

  return (
    <Stack direction={'column'} gap={6}>
      <Typography variant='h2' fontWeight={'bold'}>
        25 + 5 Clock
      </Typography>
      <Stack direction={'row'} gap={6}>
        <Stack direction={'column'} gap={3}>
          <Typography id='break-label' variant='h3'>
            Break Length
          </Typography>
          <Stack direction={'row'} justifyContent={'center'} gap={3}>
            <IconButton
              id='break-decrement'
              aria-label="Decrease"
              onClick={handleBreakDecrease}
              color="inherit"
            >
              <KeyboardArrowDown fontSize='large' />
            </IconButton>
            <Typography id='break-length' variant='h3'>
              {breakMins}
            </Typography>
            <IconButton
              id='break-increment'
              aria-label="Decrease"
              onClick={handleBreakIncrease}
              color="inherit"
            >
              <KeyboardArrowUp fontSize='large' />
            </IconButton>
          </Stack>
        </Stack>
        <Stack direction={'column'} gap={3}>
          <Typography id='session-label' variant='h3'>
            Session Length
          </Typography>
          <Stack direction={'row'} justifyContent={'center'} gap={3}>
            <IconButton
              id='session-decrement'
              aria-label='Decrease session mins'
              onClick={handleSessionDecrease}
              color="inherit"
            >
              <KeyboardArrowDown fontSize='large' />
            </IconButton>
            <Typography id='session-length' variant='h3'>
              {sessionMins}
            </Typography>
            <IconButton
              id='session-increment'
              aria-label="Decrease"
              onClick={handleSessionIncrease}
              color="inherit"
            >
              <KeyboardArrowUp fontSize='large' />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <Timer sessionMins={sessionMins} breakMins={breakMins} />
    </Stack>
  )
}

export default App
