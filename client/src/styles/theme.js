import { createTheme } from '@mui/material/styles'

const palette = {
  primary: {
    main: '#433d3d',
    light: '#645c5cff',
    dark: '#252222ff',
    contrastText: '#fff',
  },
  secondary: {
    main: '#e53935',
    light: '#ff6f60',
    dark: '#ab000d',
    contrastText: '#fff',
  },
  background: {
    default: 'hsl(44, 47%, 89%)',
    paper: '#fff',
  },
  text: {
    primary: '#433d3d',
    secondary: '#fff',
  },
}

const theme = createTheme({
  palette,

  typography: {
    fontFamily: `'Azeret Mono', 'Poppins','Poiret One', 'Rampart One', 'Bebas Neue', 'Righteous', system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
    lineHeight: 1.1,

    h3: { fontFamily: 'Bebas Neue', fontWeight: 'bold', letterSpacing: '0.2rem'},
    h4: { fontFamily: 'Bebas Neue', fontWeight: 'bold'},
    h5: { fontFamily: 'Righteous'},
    h6: { fontFamily: 'Bebas Neue', fontWeight: 'bold', color: palette.secondary.main, letterSpacing: '0.2rem',},
    body2: { fontFamily: 'Azeret Mono', fontSize: '1rem', letterSpacing: '0.05rem'},
    button: { fontFamily: 'Bebas Neue', height: '55px', fontSize: '2rem', backgroundColor: 'transparent'},

    localInfo: { fontFamily: 'Righteous' }
  },
  

  components: {

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontSize: '0.95rem',
          padding: '12px 16px',
          // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        icon: {
          '& svg': {
            color: palette.primary.main,
          },
        },
        standardInfo: {
          // backgroundColor: palette.primary.light,
          color: palette.primary.main,
        },
        standardError: {
          // backgroundColor: palette.secondary.dark,
          color: palette.primary.main,
        },
        standardSuccess: {
          // backgroundColor: '#4caf50',
          color: '#fff',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.secondary.light, // example: light gray
          borderWidth: '1px',
          margin: '16px 0',    // vertical spacing
        },
      },
      defaultProps: {
        orientation: 'horizontal', // optional default orientation
        flexItem: true,            // optional, useful in flex layouts
      },
    },
    
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
          // textDecoration: 'none', // optional: remove underline
          // '&:hover': {
          //   textDecoration: 'underline', // optional: add underline on hover
          // },
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
            border: 'none',
            borderRadius: 0, 
          '&.Mui-selected': {
            backgroundColor: palette.secondary.light,
            color: palette.primary.contrastText,
            '&:hover': {
              backgroundColor: palette.secondary.main, // or any color you want for selected+hover
            },
          },
          '&:hover': {
            backgroundColor: palette.secondary.light, // for unselected+hover
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          // padding: 8,
          transition: 'background-color 0.3s, color 0.3s',

          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)', // example hover background
          },

          '& svg': {
            transition: 'color 0.3s',
          },

          '&:hover svg': {
            color: '#f4f5f7ff', // example: change icon color on hover
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          transition: 'border-color 0.3s, box-shadow 0.3s',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            // borderColor: palette.text.secondary, // hover border color
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.text.primary, // focus border color
          },
        },
        input: {
          // padding: '12px 14px',
        },
        notchedOutline: {
          borderColor: palette.text.primary, // default border color
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: palette.text.primary, // default label color
          '&.Mui-focused': {
            color: palette.text.primary, // label color when focused
          },
        },
      },
    },

  },
})

export { theme, palette }