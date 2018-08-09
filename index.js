import React, { Component } from 'react';
const i = 1.618
class Arrow extends Component {

    constructor(props) {
        super(props)

        this.tailOffset = this.props.stroke * i * i
        this.pointerSize = (this.tailOffset * 2) * i

        this.state = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            width: 0,
            height: 0,
            startCurveOffset: { x: 0, y: 0 },
            endCurveOffset: { x: 0, y: 0 },
            endLineOffset: { x: 0, y: 0 },
            arrow: null,
        }
    }
    componentDidMount() {
        this._init()
        window.addEventListener('resize', e => {
            this._init()
        }, true)
        window.addEventListener("scroll", e => {
            this._init()
        }, true)
    }

    _init = () => {
        const startEl = this._findEl(this.props.fromSelector)
        const endEl = this._findEl(this.props.toSelector)
        if (startEl && endEl) {
            const startPoint = this._getPoint(startEl, this.props.fromSide)
            const endPoint = this._getPoint(endEl, this.props.toSide)
            const startCurveOffset = this._getCurveOffsets(startEl, this.props.fromSide, startPoint, endPoint)
            const endCurveOffset = this._getCurveOffsets(endEl, this.props.toSide, startPoint, endPoint)
            const endLineOffset = this._getLineOffset(endPoint, this.props.toSide)
            const arrow = this._getArrow(endPoint, this.props.toSide)

            if (startPoint && endPoint) {
                this.setState({
                    startX: startPoint.x,
                    startY: startPoint.y,
                    endX: endPoint.x,
                    endY: endPoint.y,
                    width: endPoint.x - startPoint.x,
                    height: endPoint.y - startPoint.y,
                    startCurveOffset,
                    endCurveOffset,
                    endLineOffset,
                    arrow
                })
            }
        }
    }


    _getLineOffset = (endPoint, side) => {
        const S = side ? side : 'top'
        let x = 0
        let y = 0
        switch (S) {
            case 'top': {
                y = this.pointerSize
                return { x, y }
            }
            case 'bottom': {
                y = -this.pointerSize
                return { x, y }
            }
            case 'left': {
                x = this.pointerSize
                return { x, y }
            }
            case 'right': {
                x = -this.pointerSize
                return { x, y }
            }
            default: {
                return null
            }
        }

    }

    _getArrow = (endPoint, side) => {
        const S = side ? side : 'top'
        switch (S) {
            case 'top': {
                return `${endPoint.x},${endPoint.y} ${endPoint.x - this.tailOffset},${endPoint.y - this.pointerSize}  ${endPoint.x + this.tailOffset},${endPoint.y - this.pointerSize}`
            }
            case 'bottom': {
                return `${endPoint.x},${endPoint.y} ${endPoint.x - this.tailOffset},${endPoint.y + this.pointerSize}  ${endPoint.x + this.tailOffset},${endPoint.y + this.pointerSize}`
            }
            case 'left': {
                return `${endPoint.x},${endPoint.y} ${endPoint.x - this.pointerSize},${endPoint.y - this.tailOffset} ${endPoint.x - this.pointerSize},${endPoint.y + this.tailOffset}`
            }
            case 'right': {
                return `${endPoint.x},${endPoint.y} ${endPoint.x + this.pointerSize},${endPoint.y - this.tailOffset} ${endPoint.x + this.pointerSize},${endPoint.y + this.tailOffset}`
            }
            default: {
                return null
            }
        }

    }

    _findEl = (selector) => {
        return document.querySelector(selector)
    }

    _getPoint = (el, side) => {
        const S = side ? side : 'top'
        switch (S) {
            case 'top': {
                const x = el.offsetLeft + (el.offsetWidth / 2)
                const y = el.offsetTop - window.scrollY
                return { x, y }
            }
            case 'bottom': {
                const x = el.offsetLeft + (el.offsetWidth / 2)
                const y = el.offsetTop + el.offsetHeight - window.scrollY
                return { x, y }
            }
            case 'left': {
                const x = el.offsetLeft
                const y = el.offsetTop + (el.offsetHeight / 2) - window.scrollY
                return { x, y }
            }
            case 'right': {
                const x = el.offsetLeft + el.offsetWidth
                const y = el.offsetTop + (el.offsetHeight / 2) - window.scrollY
                return { x, y }
            }
            default: {
                break
            }
        }

        return null
    }

    _getCurveOffsets = (el, side, startPoint, endPoint) => {
        const S = side ? side : 'top'
        let distance = Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow((endPoint.y - startPoint.y), 2))
        const curveindex = distance * 0.2

        switch (S) {
            case 'top': {
                return { x: 0, y: curveindex }
            }
            case 'bottom': {
                return { x: 0, y: -curveindex }
            }
            case 'left': {
                return { x: curveindex, y: 0 }
            }
            case 'right': {
                return { x: -curveindex, y: 0 }
            }
            default: {
                return { x: 0, y: 0 }
            }
        }
    }


    render() {
        const path = `M${this.state.startX},${this.state.startY}C${this.state.startX - this.state.startCurveOffset.x},${this.state.startY - this.state.startCurveOffset.y} ${this.state.endX - this.state.endCurveOffset.x},${this.state.endY - this.state.endCurveOffset.y} ${this.state.endX - this.state.endLineOffset.x},${this.state.endY - this.state.endLineOffset.y}`
        return (
            <svg
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none'
                }}
                width={window.innerWidth}
                height={window.innerHeight}
                viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
                preserveAspectRatio="none"
            >
                <path d={path} stroke={this.props.color ? this.props.color : '#000'} strokeWidth={this.props.stroke} fill="transparent" />
                <polygon points={this.state.arrow} fill={this.props.color ? this.props.color : '#000'} />
            </svg>
        );
    }
}

export default Arrow