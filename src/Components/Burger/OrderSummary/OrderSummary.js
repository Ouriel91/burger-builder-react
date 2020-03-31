import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

//This component doesn't have to be a class based component , it could be functional component.
//This component re renderd whether modal shown or not, (OrderSummaty nested in Modal component).
//we turned this component to class based for check this (debugging) in lifecycle components.
//see comments in Modal component
class OrderSummary extends Component {

    componentDidUpdate(){
        console.log('[OrderSummary] updated')
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )
        })

        return (
            <Aux>
                <h3>Your order: </h3>
                <p>A delicious burger with following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)} $</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType={"Danger"} clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType={"Success"} clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
} 

export default OrderSummary