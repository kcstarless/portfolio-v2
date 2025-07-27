import { createTheme } from '@mui/material/styles'

const palette = {
  primary: {
    main: '#1976d2',
    light: '#63a4ff',
    dark: '#004ba0',
    contrastText: '#fff',
  },
  secondary: {
    main: '#e53935',
    light: '#ff6f60',
    dark: '#ab000d',
    contrastText: '#fff',
  },
  background: {
    default: '#f0f0f0',
    paper: '#fff',
  },
  text: {
    primary: '#222',
    secondary: '#888',
  },
  // ...add more as needed
}

const theme = createTheme({
  palette,

  components: {
    
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1rem', // your desired size
          padding: '8px 10px', // optional: adjust padding
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: palette.primary.main, // your desired default color
          textDecoration: 'none', // optional: remove underline
          // '&:hover': {
          //   textDecoration: 'underline', // optional: add underline on hover
          // },
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: palette.secondary.main,
            color: palette.primary.contrastText,
            '&:hover': {
              backgroundColor: palette.secondary.main, // or any color you want for selected+hover
            },
          },
          '&:hover': {
            // backgroundColor: palette.primary.light, // for unselected+hover
          },
        },
      },
    },

  },
})

export { theme, palette }