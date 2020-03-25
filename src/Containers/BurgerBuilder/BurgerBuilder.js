import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

class BurgerBuilder extends Component{

    state = {
        ingerdients:{
            salad: 0,
            lamb_bacon: 0,
            vegan_cheese: 0,
            meat: 0
        }
    }

    addIngredientHandler = (type) => {
        

    }

    removeIngredientHandler = (type) => {
        
    }

    render(){
        return(
            <Aux>
                <Burger ingerdients={this.state.ingerdients} />
                <BuildControls />
            </Aux>
        )
    }
}

export default BurgerBuilder