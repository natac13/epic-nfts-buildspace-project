import { deepPurple, green, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green[500],
    },
    secondary: {
      main: deepPurple[800],
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
