import React from 'react'
import classes from './Order.module.css'

const order = (props) => {

    const ingerdients = []
    for(let ingredientName in props.ingerdients){
        ingerdients.push({
            name: ingredientName,
            amount: props.ingerdients[ingredientName]
        })
    }

    const ingredientOutput = ingerdients.map(ingredient =>{
        return(<span 
                key={ingredient.name}
                style={{
                    textTransform:'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
            }}>{ingredient.name} ({ingredient.amount})</span>)
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong></p>
        </div>
    )
}

export default order