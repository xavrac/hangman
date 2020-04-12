import PropTypes from 'prop-types'
import React from 'react'
import './Riddle.css'

const Riddle = ( {word, isRevealed} ) => (
    <div className="riddle">
        {word.map( ( (letter, index) => (
            <div key={index} className="letter">
                {isRevealed(letter) ? letter : '_'}
            </div>
        )))}
    </div>
)

Riddle.propTypes = {
    word: PropTypes.array.isRequired,
    isRevealed: PropTypes.func.isRequired,
}

export default Riddle