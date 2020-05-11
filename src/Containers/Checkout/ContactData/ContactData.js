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
                label:'Name:'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                label:'Street:'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                label:'ZIP Code:'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                label:'Country:'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                label:'Email:'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })

        const order = {
            ingerdients: this.props.ingerdients,
            price: this.props.price,

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

    render() {

        const formElementArray = []
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        
        let form = (
            <form>

                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.label} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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