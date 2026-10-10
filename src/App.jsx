import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import { Box, Container, createTheme, IconButton, ThemeProvider } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {

  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('light');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    const searchTerm = word.trim();

    if (!searchTerm) {
      setData([]);
      setError('');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setData([]);
    setError('');
    setLoading(true);

    const timeout = window.setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://freedictionaryapi.com/api/v1/entries/en/${encodeURIComponent(searchTerm)}`,
          { signal: controller.signal }
        );
        if (!controller.signal.aborted) {
          setData(response.data.entries || []);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          if (!requestError.response || requestError.response.status !== 404) {
            console.error('Unable to load dictionary definition', requestError);
            setError('Unable to load the definition. Please try again.');
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [word]);


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container
          className="pageContainer"
          maxWidth="md"
          sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            transition: 'all 0.5s linear',
          }}
        >
          <div className="modeButton">
            <Box
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
              }}
            >
              {theme.palette.mode} mode
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}
                color="inherit"
              >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </div>
          <Header word={word} setWord={setWord} />
          {data && (
            <Definitions
              word={word}
              data={data}
              loading={loading}
              error={error}
            />
          )}
        </Container>
      </ThemeProvider>
    </div>
  )
}



export default App;
