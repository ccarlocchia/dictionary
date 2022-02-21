import React from 'react';
import './Definitions.css';

const Definitions = ({data, word}) => {
  return (
    <div className='meanings'>
        {
            word === ''? (
            <span className='subTitle'>start by typing a word</span>
        ) : (
            data.map((mean) =>
                mean.meanings.map((item) =>
                    item.definitions.map((def) => (
                        <div className='singleMean'>
                            <b>{ def.definition}</b>
                            <hr style={{width:"100%"}}/>
                            {
                                def.example && (
                                    <span>
                                        <b>Example : </b>{def.example}
                                    </span>
                                )}
                                {def.synonyms && (
                                    <span>
                                        <b>Synomyn : </b>{def.synonyms.map((s) => `${s}/`)}
                                    </span>
                                )}
                        </div>
                ))
          )
        )
      )}
    </div>
  )
}

export default Definitions