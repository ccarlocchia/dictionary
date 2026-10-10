import React from 'react';
import './Definitions.css';

const Definitions = ({data, word, loading, error}) => {
  return (
    <div className='meanings'>
      {!word.trim() ? (
        <span className='subTitle'>start by typing a word</span>
      ) : loading ? (
        <span className='subTitle'>Searching...</span>
      ) : error ? (
        <span className='subTitle'>{error}</span>
      ) : data.length === 0 ? (
        <span className='subTitle'>No definition found for "{word.trim()}".</span>
      ) : (
        <>
          {data.map((entry) =>
            entry.senses.map((sense, index) => (
              <div className='singleMean' key={`${entry.partOfSpeech}-${index}`}>
                <i>{entry.partOfSpeech}</i>
                <b>{sense.definition}</b>
                <hr style={{width:"100%"}}/>
                {sense.examples && sense.examples[0] && (
                  <span>
                    <b>Example: </b>{sense.examples[0]}
                  </span>
                )}
                {sense.synonyms && sense.synonyms.length > 0 && (
                  <span>
                    <b>Synonyms: </b>{sense.synonyms.join(', ')}
                  </span>
                )}
              </div>
            ))
          )}
          <a
            href="https://freedictionaryapi.com/"
            target="_blank"
            rel="noreferrer"
          >
            Definitions from Free Dictionary API
          </a>
        </>
      )}
    </div>
  )
}

export default Definitions