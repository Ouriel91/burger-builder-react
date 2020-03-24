import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredeint from '../BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    return(
        <div className={classes.Burger}>
            <BurgerIngredeint type="bread-top"/>
            <BurgerIngredeint type="vegan_cheese"/>
            <BurgerIngredeint type="meat"/>
            <BurgerIngredeint type="bread-bottom"/>
        </div>
    )
}

export default burger