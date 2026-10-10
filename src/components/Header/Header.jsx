import { TextField } from '@mui/material';
import React from 'react';
import './Header.css';

const Header = ({setWord, word}) => {
  return (
    <header className="header">
      <span className="eyebrow">A little curiosity goes a long way</span>
      <h1 className="title">{word || 'Dictionary'}</h1>
      <p className="tagline">Find the words. Discover the meaning.</p>
      <div className="inputs">
        <TextField
          label="Search a word"
          className="search"
          value={word}
          onChange={(event) => setWord(event.target.value)}
          variant="outlined"
          autoComplete="off"
        />
      </div>
    </header>
  )
}

export default Header