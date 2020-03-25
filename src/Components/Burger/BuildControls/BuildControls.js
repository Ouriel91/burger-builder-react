import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Vegan Cheese', type: 'vegan_cheese' },
    { label: 'Lamb Bacon', type: 'lamb_bacon' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl => ( //round curly bracelets becasue here we return jsx
            <BuildControl key={ctrl.label} label={ctrl.label} />
        ))}
    </div>
)

export default buildControls