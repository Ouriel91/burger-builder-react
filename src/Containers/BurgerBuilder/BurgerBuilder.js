import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    vegan_cheese: 0.4,
    meat: 1.3,
    lamb_bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingerdients: {
            salad: 0,
            lamb_bacon: 0,
            vegan_cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingerdients) {

        const sum = Object.keys(ingerdients)
            .map(igKey => {
                //return amount of each ingredient
                return ingerdients[igKey]
            }).reduce((sum, el) => { //now output will be the sum (the goal here is not flatten the array) , 0 initial value of sum
                return sum + el
            },0)
        
        this.setState({purchasable: sum > 0}) //applied in true or false by condition
    }

    addIngredientHandler = (type) => {

        //update ingredients
        const oldCount = this.state.ingerdients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            //state should be update immutable (something cannot change its value or state)
            ...this.state.ingerdients
        }
        updatedIngredients[type] = updatedCount

        //update price
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({ totalPrice: newPrice, ingerdients: updatedIngredients })

        this.updatePurchaseState(updatedIngredients) //means you added/removed ingredients and check if you buy at least on ingredient

    }

    removeIngredientHandler = (type) => {

        //update ingredients
        const oldCount = this.state.ingerdients[type]
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            //state should be update immutable (something cannot change its value or state)
            ...this.state.ingerdients
        }
        updatedIngredients[type] = updatedCount

        //update price
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({ totalPrice: newPrice, ingerdients: updatedIngredients })

        this.updatePurchaseState(updatedIngredients) //means you added/removed ingredients and check if you buy at least on ingredient
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('continue')
    }

    render() {

        const disabledInfo = {
            ...this.state.ingerdients
        }

        for (let key in disabledInfo) {
            //true or false by condition in each ingredient like {meat: true, salad: false...}
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingerdients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingerdients={this.state.ingerdients} />
                <BuildControls
                    ingerdientAdded={this.addIngredientHandler}
                    ingerdientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    orderd={this.purchaseHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder