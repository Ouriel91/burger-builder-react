import React, { Component } from 'react'
import classes from './BurgerIngredient.module.css'
import PropTypes from 'prop-types'

class BurgerIngredeint extends Component {

    render() {

        let ingredient = null

        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = <div className={classes.BreadBottom}></div>
                break
            case 'bread-top':
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                )
                break
            case 'meat':
                ingredient = <div className={classes.Meat}></div>
                break
            case 'vegan_cheese':
                ingredient = <div className={classes.Vegan_Cheese}></div>
                break
            case 'salad':
                ingredient = <div className={classes.Salad}></div>
                break
            case 'lamb_bacon':
                ingredient = <div className={classes.Lamb_Bacon}></div>
                break

            default:
                ingredient = null
        }

        return ingredient
    }
}

//Type checking with propTypes
BurgerIngredeint.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredeint
