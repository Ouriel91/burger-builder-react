import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../Components//UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
    salad: 0.5,
    vegan_cheese: 0.4,
    meat: 1.3,
    lamb_bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingerdients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false, 
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-react-d2e88.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingerdients: response.data })
            })
            .catch( error => {
                this.setState( { error: true } );
            })
    }

    updatePurchaseState(ingerdients) {

        const sum = Object.keys(ingerdients)
            .map(igKey => {
                //return amount of each ingredient
                return ingerdients[igKey]
            }).reduce((sum, el) => { //now output will be the sum (the goal here is not flatten the array) , 0 initial value of sum
                return sum + el
            }, 0)

        this.setState({ purchasable: sum > 0 }) //applied in true or false by condition
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
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {

        this.setState({ loading: true })

        const order = {
            ingerdients: this.state.ingerdients,
            price: this.state.totalPrice,
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
                this.setState({ loading: false, purchasing: false }) //stop loading spinner and close modal
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false }) //stop loading spinner and close modal
            })
    }

    render() {

        const disabledInfo = {
            ...this.state.ingerdients
        }

        for (let key in disabledInfo) {
            //true or false by condition in each ingredient like {meat: true, salad: false...}
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.state.ingerdients) {
            burger = (
                <Aux>
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

            orderSummary = <OrderSummary
                ingredients={this.state.ingerdients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)