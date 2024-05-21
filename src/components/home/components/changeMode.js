import React, { useState } from 'react';
import '../styles.css';

function modeSelector({m_mode, m_setMode}) {
    

    return (
        <div className='mode-sele'>
            {m_mode === 'recommendation' && (
                <img id="refreshButton"src={require("../images/refresh.png")} onClick={() => alert('Refresh recommendations')}>
                </img>
            )}
            <button
                id="RecMode"
                className={m_mode === 'recommendation' ? 'active' : 'inactive'}
                onClick={() => m_setMode('recommendation')}
            >
                Recommendation
            </button>
            <button
                id="SearchMode"
                className={m_mode === 'search' ? 'active' : 'inactive'}
                onClick={() => m_setMode('search')}
            >
                Search
            </button>
            
        </div>
    );
}

export default modeSelector;
