import React from 'react'
import Aux from '../../hoc/Auxilliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

//The content inside the <main> element should be unique to the document. 
//It should not contain any content that is repeated across documents such as 
//sidebars, navigation links, copyright information, site logos, and search forms.
const layout = (props) => (
   <Aux>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
   </Aux>
)


export default layout