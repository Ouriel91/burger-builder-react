import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input'

class ConatactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })

        const order = {
            ingerdients: this.props.ingerdients,
            price: this.props.price,
            customer: {
                name: 'Ouriel Ohayon',
                address: {
                    street: 'some street',
                    zipCode: '12345',
                    country: 'Israel',
                },
                email: 'something@gmail.com'
            },
            deliveryMethod: 'fatest'
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

        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" label="Name:" />
                <Input inputtype="input" type="text" name="email" placeholder="Your Mail" label="Email:" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" label="Street:" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" label="Postal Code:" />
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