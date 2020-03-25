import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary'
import Burger from '../../Components/Burger/Burger'

class BurgerBuilder extends Component{

    state = {
        ingerdients:{
            salad: 0,
            lamb_bacon: 0,
            vegan_cheese: 0,
            meat: 0
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingerdients={this.state.ingerdients} />
                <div>BuildControls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder