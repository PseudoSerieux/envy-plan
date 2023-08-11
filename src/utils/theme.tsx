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
