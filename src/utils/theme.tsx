import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9C28E3',
    },
    secondary: {
       // This is green.A700 as hex.
       main: '#90EE90',
     },
  },
  // components: {
  //   // Name of the component
  //   MuiOutlinedInput: {
  //     styleOverrides: {
  //       // Name of the slot
  //       root: {
  //         // Some CSS
  //         borderColor: '#9C28E3'
  //       },
  //     },
  //   },
  // },
  components: {
    MuiSnackbar:{
      styleOverrides:{
        root:{
          top:"-90%",
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: '50%',
          boxShadow: '0px 10px 20px -15px  #9C28E3',
          borderRadius: '25px 25px 25px 25px'
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // boxShadow: "unset"
        },
      }
    },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderColor: '#9C28E3',
      },
    }
  },
  MuiInputBase: {
    styleOverrides:{
      root: {
        "&$disabled": {
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: "9C28E3",
            //  background: "grey"
          }
        }
      }
    }
  }
}
  
});
