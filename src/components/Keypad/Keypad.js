import React from 'react';
import Screen from '../Screen/Screen';
import Result from '../Result/Result';
import History from '../History/History';
import calculate from '../../calculation/Calculate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/fontawesome-free-solid';
import './Keypad.css';

class Keypad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expr: '',
            char: '',
            getResult: false,
            result: '00',
            history: [],
            toggle: false,
            prevChar: ''
        }
    }
    componentDidUpdate() {
        /*  console.log(this.state); */
        /* console.log(this.state.expr.slice(-1)); */ //last char
        /* console.log(this.state.expr.slice(this.state.expr.length - 2, this.state.expr.length - 1)); */ //second last
    }
    keyPressedHandler = (val) => {

        this.setState((prevState) => {

            if (prevState.char === '' && val !== 'AC' && val !== 'BACK' && val !== 'TOGGLE') {
                return { expr: val, char: val }

            } else if (val === '=') {
                const prevExpr = this.state.expr
                const prevChar = prevExpr.slice(this.state.expr.length - 2, this.state.expr.length - 1)
                var re = /^\d$/;
                if (re.test(this.state.char)) {

                    /* const prevExpr = this.state.expr
                    const prevChar = prevExpr.slice(this.state.expr.length - 2, this.state.expr.length - 1) */

                    return {
                        getResult: true,
                        result: calculate(this.state.expr),
                        history: this.state.history.concat(this.state.expr),
                        char: this.state.char,
                        prevChar: prevChar
                    }
                } else if (this.state.char === '%') {
                    /* const prevExpr = this.state.expr
                    const prevChar = prevExpr.slice(this.state.expr.length - 2, this.state.expr.length - 1) */
                    const currExpr = prevExpr.slice(0, prevExpr.length - 1);
                    const result = (parseInt(currExpr) / 100)
                    return {
                        getResult: true,
                        result: result,
                        history: this.state.history.concat(this.state.expr),
                        char: this.state.char,
                        prevChar: prevChar,
                        expr: currExpr
                    }
                }
                else {
                    alert("Invalid Expression !!!")
                }

            } else if (val === 'AC') {
                if (prevState.expr !== '') {
                    return { expr: '', result: '00', prevChar: '', char: '' }
                }
            } else if (val === 'BACK') {
                const prevExpr = prevState.expr.slice(0, prevState.expr.length - 1)
                const prevChar = prevExpr.slice(prevExpr.length - 2, prevExpr.length - 1)
                return {
                    expr: prevExpr,
                    char: prevExpr.slice(-1),
                    prevChar: prevChar
                }
            } else if (val === 'TOGGLE') {
                return { toggle: !prevState.toggle }
            }
            else {
                const prevChar = this.state.expr.slice(this.state.expr.length - 2, this.state.expr.length - 1)
                return {
                    expr: prevState.expr + "" + val,
                    char: val,
                    prevChar: prevChar /* prevState.char */
                }
            }
        })
    }

    render() {
        let result = <p>00</p>;
        if (this.state.getResult) {
            result = <Result result={this.state.result} />
        }
        let keypad = (
            <div className="board">
                <Screen expr={this.state.expr} />
                <div className="keypad">
                    <div className="key-row">
                        <button className="btn-key" name="AC" onClick={() => this.keyPressedHandler("AC")} >AC</button>
                        <button className="btn-key"
                            onClick={() => this.keyPressedHandler("BACK")}>
                            <FontAwesomeIcon icon={faLongArrowAltLeft} />
                        </button>
                        <button className="btn-key" name="%" onClick={() => this.keyPressedHandler("%")}>%</button>
                        <button className="btn-key" name="/" onClick={() => this.keyPressedHandler("/")} >/</button>
                    </div>

                    {/* <FontAwesomeIcon icon={faLongArrowAltLeft} /> */}
                    <div className="key-row">
                        <button className="btn-key" name="7" onClick={() => this.keyPressedHandler("7")} >7</button>
                        <button className="btn-key" name="8" onClick={() => this.keyPressedHandler("8")} >8</button>
                        <button className="btn-key" name="9" onClick={() => this.keyPressedHandler("9")} >9</button>
                        <button className="btn-key" name="x" onClick={() => this.keyPressedHandler("*")} >x</button>


                    </div>
                    <div className="key-row">

                        <button className="btn-key" name="4" onClick={() => this.keyPressedHandler("4")} >4</button>
                        <button className="btn-key" name="5" onClick={() => this.keyPressedHandler("5")} >5</button>
                        <button className="btn-key" name="6" onClick={() => this.keyPressedHandler("6")} >6</button>
                        <button className="btn-key" name="-" onClick={() => this.keyPressedHandler("-")} >-</button>

                    </div>
                    <div className="key-row">
                        <button className="btn-key" name="1" onClick={() => this.keyPressedHandler("1")} >1</button>
                        <button className="btn-key" name="2" onClick={() => this.keyPressedHandler("2")} >2</button>
                        <button className="btn-key" name="3" onClick={() => this.keyPressedHandler("3")} >3</button>
                        <button className="btn-key" name="+" onClick={() => this.keyPressedHandler("+")} >+</button>
                    </div>
                    <div className="key-row">
                        <button className="btn-key" name="0" onClick={() => this.keyPressedHandler("0")} >0</button>
                        <button className="btn-key" name="." onClick={() => this.keyPressedHandler(".")} >.</button>
                        <button className="btn-key result" name="=" onClick={() => this.keyPressedHandler("=")} >=</button>
                    </div>
                </div>
                {result}
            </div>
        );
        if (this.state.toggle) {
            keypad = <History history={this.state.history} />
        }
        return (
            <div className="Layout">
                {keypad}
                <div className="toggle">
                    <button className="btn-toggle" onClick={() => this.keyPressedHandler("TOGGLE")}>{this.state.toggle ? "BACK" : "HISTORY"}</button>
                </div>
            </div>
        );
    }
};

Keypad.defaultProps = {
    expr: ''
}

export default Keypad;