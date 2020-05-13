import React from 'react'
import classes from './Input.module.css'

const input = (props) => {

    let inputElement = null
    const inputClasses = [classes.InputElement]
    let validationErrorMessage = null

    if(props.invalid && props.shouldValidate) { //add to condition && props.touched for more beautiful UI
        inputClasses.push(classes.Invalid)
        validationErrorMessage = 
            <p><span className={classes.ValidationError}>{props.error}</span></p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value}
                            value={option.value}>
                                {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
    }

    return (
        <div className={classes.Input}>
            <lable className={classes.Label}>{props.label}</lable>
            {inputElement}
            {validationErrorMessage}
        </div>
    )
}

export default input