import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

//The content inside the <main> element should be unique to the document. 
//It should not contain any content that is repeated across documents such as 
//sidebars, navigation links, copyright information, site logos, and search forms.

//Turn layout to class based component to trigger backdrop
class Layout extends Component {

    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler= () => {
        this.setState( (prevState) => { //prevent a problems with async code (this state depends in the old state)
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout