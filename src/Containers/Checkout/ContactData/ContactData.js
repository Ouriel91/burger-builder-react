import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input'

class ConatactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                label: 'Name:',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Name should not be empty'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                label: 'Street:',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Street should not be empty'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                label: 'ZIP Code:',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
                errorMessage: 'Only 5 characters for zip code'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                label: 'Country:',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Country should not be empty'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                label: 'Email:',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Email should not be empty, and need to include @'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                value: 'fastest',
                label: 'Delivery options:',
                valid:true
            }
        },
        formIsValid:false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const formData = {}
        for (let element in this.state.orderForm) {
            formData[element] = this.state.orderForm[element].value
        }
        const order = {
            ingerdients: this.props.ingerdients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false }) //stop loading spinner and close modal
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({ loading: false }) //stop loading spinner and close modal
            })
    }

    inputChangedHandler = (event, inputId) => {
        //not mutate state directly - make a copy 
        //(in this case also to nested object - because orderForm is nested)
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updadedFormElement = {
            ...updatedOrderForm[inputId]
        }
        
        updadedFormElement.value = event.target.value
        updadedFormElement.valid = this.checkValidity(updadedFormElement.value, updadedFormElement.validation,
            updadedFormElement.elementConfig.type,updadedFormElement.value)
        updadedFormElement.touched = true
        updatedOrderForm[inputId] = updadedFormElement

        let formIsValid = true
        for(let element in updatedOrderForm){
            formIsValid = updatedOrderForm[element].valid && formIsValid
        }

        this.setState({ orderForm: updatedOrderForm ,formIsValid}) //shorthand
    }

    checkValidity(value, rules,type,contentValue) {
        let isValid = true
        
        if (rules.required) {
            //if rule should be required (not be empty) - cut the spaces in value beginning 
            isValid = value.trim() !== '' && isValid //True gate 
            //isValid assign to true only when isValid and this condition will be true
        }

        if(type === 'email'){
            //special check for email that includes @
            isValid = contentValue.includes('@') && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    render() {

        const formElementArray = []
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>

                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.label}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        error={formElement.config.errorMessage}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ConatactData}>
                <h4>Enter your Contact Data:</h4>
                {form}
            </div>
        )
    }
}

export default ConatactData