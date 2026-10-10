import React from 'react';
import './Definitions.css';

const htmlToText = (html) =>
    new DOMParser().parseFromString(html, 'text/html').body.textContent || '';

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
            entry.definitions.map((definition, index) => (
              <div className='singleMean' key={`${entry.partOfSpeech}-${index}`}>
                <b>{htmlToText(definition.definition)}</b>
                <hr style={{width:"100%"}}/>
                {definition.examples && definition.examples[0] && (
                  <span>
                    <b>Example: </b>{htmlToText(definition.examples[0])}
                  </span>
                )}
              </div>
            ))
          )}
          <a
            href={`https://en.wiktionary.org/wiki/${encodeURIComponent(word.trim().replace(/ /g, '_'))}`}
            target="_blank"
            rel="noreferrer"
          >
            Definitions from Wiktionary
          </a>
        </>
      )}
    </div>
  )
}

export default Definitions