import React, { Component } from 'react'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    state = {
        ingerdients: {
            salad: 1,
            meat: 1,
            vegan_cheese: 1,
            lamb_bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingerdients = {}
        for (let param of query.entries()) {
            //key should be like this: ['salad', '1']
            //each entry has key & value (0 & 1 places ), + make it number
            ingerdients[param[0]] = +param[1]
        }
        this.setState({ ingerdients }) //shorthand
    }

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
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout