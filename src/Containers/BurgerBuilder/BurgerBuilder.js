import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary'
import Burger from '../../Components/Burger/Burger'

class BurgerBuilder extends Component{

    render(){
        return(
            <Aux>
                <Burger />
                <div>BuildControls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder