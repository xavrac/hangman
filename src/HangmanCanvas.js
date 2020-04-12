import PropTypes from 'prop-types'
import React, { Component } from 'react'

const RED_COLOR = 'rgb(200, 0, 0)'
const HANGMAN_STEPS = [
    (ctx) => {
        ctx.moveTo(5, 240)
        ctx.lineTo(70, 240)
    },
    (ctx) => {
        ctx.moveTo(25, 240)
        ctx.lineTo(25, 20)
    },
    (ctx) => {
        ctx.moveTo(24, 20)
        ctx.lineTo(105, 20)
    },
    (ctx) => {
        ctx.moveTo(25, 40)
        ctx.lineTo(45, 20)
    },
    (ctx) => {
        ctx.moveTo(105, 19)
        ctx.lineTo(105, 45)
    },
    (ctx) => {
        // Head
        ctx.moveTo(117, 57)
        ctx.arc(105, 57, 12, 0, 3 * Math.PI * 2, false)
    },
    (ctx) => {
        // Body
        ctx.moveTo(105, 69)
        ctx.lineTo(105, 130)
    },
    (ctx) => {
        // Left leg
        ctx.moveTo(105, 130)
        ctx.lineTo(80, 180)
    },
    (ctx) => {
        // Right leg
        ctx.moveTo(105, 130)
        ctx.lineTo(125, 180)
    },
    (ctx) => {
        // Left arm
        ctx.moveTo(105, 85)
        ctx.lineTo(85, 115)
    },
    (ctx) => {
        // Right arm
        ctx.moveTo(105, 85)
        ctx.lineTo(125, 115)
    }
]

class HangmanCanvas extends Component {

    constructor(props) {
        super(props)
        this.canvas = React.createRef()
    }

    componentDidMount() {
        this.resetCanvas()
    }

    shouldComponentUpdate({ numberOfErrors }) {
        if (numberOfErrors === 0) {
            this.resetCanvas()
        }
        return this.props.numberOfErrors !== numberOfErrors
    }

    resetCanvas() {
        const canvas = this.canvas.current
        const ctx = canvas.getContext("2d")
        const endStepIndex = HANGMAN_STEPS.length - this.props.maxErrorsAuthorized

        ctx.fillRect(0, 0, 150, 250)
        ctx.clearRect(1, 1, 148, 248)
        ctx.strokeRect(1, 1, 148, 248)
        this.drawHangmanSteps(0, endStepIndex, ctx)
    }

    drawHangmanSteps(startStepIndex, endStepIndex, ctx) {
        ctx.beginPath()
        HANGMAN_STEPS.slice(startStepIndex, endStepIndex).forEach(step => step(ctx))
        ctx.closePath()
        ctx.stroke()
    }

    componentDidUpdate({ maxErrorsAuthorized }) {
        const canvas = this.canvas.current
        const ctx = canvas.getContext("2d")
        const newNumberOfErrors = this.props.numberOfErrors
        const startStepIndex = HANGMAN_STEPS.length - maxErrorsAuthorized
        const endStepIndex = startStepIndex + newNumberOfErrors

        if (endStepIndex === HANGMAN_STEPS.length) {
            ctx.fillStyle = RED_COLOR
            ctx.fillRect(1, 1, 149, 249)
            ctx.beginPath()
            ctx.moveTo(102, 50)
            ctx.lineTo(98, 58)
            ctx.moveTo(98, 50)
            ctx.lineTo(102, 58)

            ctx.moveTo(107, 50)
            ctx.lineTo(112, 58)
            ctx.moveTo(112, 50)
            ctx.lineTo(107, 58)
            ctx.closePath()
            ctx.stroke()
        }

        this.drawHangmanSteps(0, endStepIndex, ctx)
    }

    render() {
        return (
            <div>
                <canvas ref={this.canvas} height={250} width={150} />
            </div>
        )
    }
}

HangmanCanvas.propTypes = {
    numberOfErrors: PropTypes.number.isRequired,
    maxErrorsAuthorized: PropTypes.number.isRequired,
}

HangmanCanvas.defaultProps = {
    numberOfErrors: 0,
}

export default HangmanCanvas