import React , { Component }from 'react'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

    state = {
        ingerdients: {
            salad: 1,
            meat: 1,
            vegan_cheese: 1,
            lamb_bacon: 1
        }
    }

    render() {
        return (
            <CheckoutSummary ingerdients={this.state.ingerdients}/>
        )
    }
}

export default Checkout