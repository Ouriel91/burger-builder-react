import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredeint from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    //get the props.ingerdients as keys and map them
    let transformedIngredients = Object.keys(props.ingerdients)
        .map(igKey => {

            //make a new copy array (don't change the original one) of ingredients amount.
            //for each props.ingredients key (like meat) , for example: meat: 2 will be array with 2 empty spaces,
            //and with spread operator return whole ingredients array.

            return [...Array(props.ingerdients[igKey])].map((_, i) => {

            //map each ingredient array to take care in values of props.ingredients (like=> meat: 2, map the 2 empty spaces).
            //(_,i) means that in this map, the element (key) is not important for us , but the index is  ,
            //because we want to return an array with amount of single ingredient (like meat),
            //and index (i) to key attribute in returned array
            //key attribue is important! key should be unique so we add the i to key (so each key is like salad0, salad1 and so on)

            return <BurgerIngredeint key={igKey + i} type={igKey} />

            //in the end , after mapping we returned an component with his type and unique key
            //the outputed array is array of 4 places with array in it in each array cell till reduce 
        })
    }).reduce((arr, el)=>{
        //reduce can help us to make our to one big array, reduce will loop on each elements and in the end
        //return another output
        //concat can help us to merge two arrays, so we merge all the arrays (each ingredient array) in big array.
        //[] is initializing value
        return arr.concat(el)
    }, [])
    
    if(transformedIngredients.length === 0 ){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredeint type="bread-top" />
            {transformedIngredients}
            <BurgerIngredeint type="bread-bottom" />
        </div>
    )
}

export default burger