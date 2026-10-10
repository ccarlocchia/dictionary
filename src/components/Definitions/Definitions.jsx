import React from 'react';
import './Definitions.css';

const Sense = ({sense, index}) => (
  <div className="sense">
    <b>{sense.definition}</b>
    {sense.tags && sense.tags.length > 0 && (
      <div className="senseTags" aria-label="Usage">
        {sense.tags.map((tag) => <span className="senseTag" key={tag}>{tag}</span>)}
      </div>
    )}
    {sense.examples && sense.examples.map((example, exampleIndex) => (
      <blockquote className="senseExample" key={`${example}-${exampleIndex}`}>
        {example}
      </blockquote>
    ))}
    {sense.synonyms && sense.synonyms.length > 0 && (
      <p className="senseSynonyms"><b>Synonyms</b> {sense.synonyms.join(', ')}</p>
    )}
    {sense.subsenses && sense.subsenses.length > 0 && (
      <div className="subsenses">
        {sense.subsenses.map((subsense, subsenseIndex) => (
          <Sense
            sense={subsense}
            index={`${index}-${subsenseIndex}`}
            key={`${subsense.definition}-${subsenseIndex}`}
          />
        ))}
      </div>
    )}
  </div>
);

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
        <div className="emptyState">
          <span className="emptyIcon" aria-hidden="true">?</span>
          <span className="subTitle">No definition found for "{word.trim()}".</span>
          <span>Try another spelling or a different word.</span>
        </div>
      ) : (
        <>
          {data.map((entry, entryIndex) => (
            <div className="singleMean" key={`${entry.partOfSpeech}-${entryIndex}`}>
              <div className="entryHeading">
                <span className="partOfSpeech">{entry.partOfSpeech}</span>
              </div>
              {entry.synonyms && entry.synonyms.length > 0 && (
                <p className="entrySynonyms">
                  <b>Related words</b> {entry.synonyms.join(', ')}
                </p>
              )}
              <div className="senses">
                {entry.senses.map((sense, index) => (
                  <Sense sense={sense} index={index} key={`${sense.definition}-${index}`} />
                ))}
              </div>
            </div>
          ))}
          <a className="attribution"
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