import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'

import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    initState = () => {
        const query = new URLSearchParams(this.props.location.search)
        const ingerdients = {}
        let price = 0
        for (let param of query.entries()) {

            if (param[0] === 'price') {
                price = param[1]
            } else {
                //key should be like this: ['salad', '1']
                //each entry has key & value (0 & 1 places ), + make it number
                ingerdients[param[0]] = +param[1]
            }
        }
        return {
            ingerdients, //shorthand
            totalPrice:price //create totalPrice when doesn't exists
        }
        
    }

    state = this.initState()

    checkoutCanceledHandler = () => {
        //go to last page when cancel button clicked
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        //go to contact page when continue button clicked
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingerdients={this.state.ingerdients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData 
                        ingerdients={this.state.ingerdients}
                        price={this.state.totalPrice}
                        {...props} />)} />
            </div>
        )
    }
}

export default Checkout