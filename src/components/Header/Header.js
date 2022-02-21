import { TextField } from '@mui/material';
import React from 'react';
import './Header.css';

const Header = ({setWord, word, setData, }) => {

    

  return (
    <div className='header'>
        <span className='title'>{word?word:"Dictionary"}</span>
        <div className='inputs'>
            <TextField 
                    label="Search a word"
                    className='search' 
                    value={word}
                    onChange={(e)=>setWord(e.target.value)}
                    variant="outlined"
                    >
            </TextField>
    </div>
    </div>
  )
}

export default Header