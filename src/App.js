import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import {Box, Container, createTheme, IconButton, ThemeProvider, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {

  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const themePalette = useTheme();
  const contextColorMode = React.useContext(ColorModeContext);
  const [mode, setMode] = React.useState('light');
  
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const provTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {

    const dictionaryApi = async () => {
      try {
        const data = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    dictionaryApi();
  }, [word]);


  return (
    <div 
      className="App" 
      style={{
        height:'100vh',
        transition: "all 0.5s linear"
        }}
      
    >
      <ColorModeContext.Provider value={contextColorMode}>
        <ThemeProvider theme={provTheme}>
          <Container  
            style={{
              display:"flex", 
              flexDirection:"column", 
              height:'100vh', 
              justifyContent:"space-evenly"
            }}
          sx={{
              bgcolor: 'background.default',
              color: 'text.primary',
              transition: "all 0.5s linear"
            }}  
          >
            <div className='modeButton'>
              {/* <ColorModeContext.Provider value={contextColorMode}>
                <ThemeProvider theme={provTheme}> */}
                  <Box
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1,
                    }}
                  >
                    {provTheme.palette.mode} mode
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                      {provTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                  </Box>
              {/*  </ThemeProvider>
              </ColorModeContext.Provider> */}
            </div>
            <Header 
              word={word} 
              setWord={setWord}
              setData={setData}
              />
            {
              data && (
                <Definitions
                  word={word}
                  data={data}
                />
              )}
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  )
}



export default App;
