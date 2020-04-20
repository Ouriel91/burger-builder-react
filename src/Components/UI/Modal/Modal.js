import React, { Component } from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

//This component includes (nested component) OrderSummary component
//shouldComponentUpdate (lifecycle method, available only in class based) checked if props or state changed (next and the current)
//if it's equal - the component will not rendred , in this move we prevent to OrderSummary from rendering all the time
//(we can also check if modalClosed prop changed, or use in PureComponent , but we don't have to) 
class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        //when we clicked continue the modal children update (OrderSummary or Spinner)
        //we add another check for children component so modal component update with spinner in it
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentDidUpdate(){
        console.log('[Modal] updated')
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }

}

export default Modal