import React from 'react'
import PropTypes from 'prop-types'
import './Keyboard.css'

const Keyboard = ({ keys, onClick, status }) => (
    <div className="keyboard">
        { 
            keys.map( (key) => (
                <span className={`key ${status(key)}`} key={key} onClick={() => onClick(key)}>{key}</span>
            ))
        }
    </div>
)

Keyboard.propTypes = {
    keys: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onClick: PropTypes.func.isRequired,
    status: PropTypes.func.isRequired,
}

Keyboard.defaultProps = {
    gameStatus: 'playing'
}

export default Keyboard