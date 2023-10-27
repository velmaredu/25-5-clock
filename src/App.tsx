import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import { DEFAULT_BREAK_MINS, DEFAULT_SESSION_MINS } from './components/constants'

function App() {
  const [sessionMins, setSessionMins] = useState(DEFAULT_SESSION_MINS);
  const [breakMins, setBreakMins] = useState(DEFAULT_BREAK_MINS);

  const handleBreakMinsChange = (newBreakMins: number) => {
    setBreakMins(newBreakMins);
  };

  const handleBreakDecrease = () => {
    if (breakMins > 1)
      setBreakMins(breakMins - 1);
  };

  const handleBreakIncrease = () => {
    if (breakMins < 60)
      setBreakMins(breakMins + 1);
  };

  const handleSessionMinsChange = (newSessionMins: number) => {
    setSessionMins(newSessionMins);
  };

  const handleSessionDecrease = () => {
    if (sessionMins > 1)
      setSessionMins(sessionMins - 1);
  };

  const handleSessionIncrease = () => {
    if (sessionMins < 60)
      setSessionMins(sessionMins + 1);
  };

  return (
    <Stack direction={'column'} gap={{ xs: 2, md: 6 }} sx={{ height: '100%' }} justifyContent={'center'}>
      <Typography variant='h2' fontWeight={'bold'}>
        25 + 5 Clock
      </Typography>
      <Stack direction={'row'} gap={{ xs: 2, md: 6 }} flexWrap={'wrap'} justifyContent={'center'}>
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
      <Timer sessionMins={sessionMins} breakMins={breakMins} setSessionMins={handleSessionMinsChange} setBreakMins={handleBreakMinsChange} />
    </Stack>
  )
}

export default App
