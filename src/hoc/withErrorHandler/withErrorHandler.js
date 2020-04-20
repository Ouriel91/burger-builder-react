import React, { Component } from 'react'
import Modal from '../../Components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

//wrapper component for some error if caused , the component will wrap burger builder component
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            initialized: false,
            error: null
        }

        componentDidMount() { 
            
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            });
            this.setState({ initialized: true })
        }

        componentWillUnmount() {
            //make sure that when we don't need this component anymore (that wrappers another component)
            //to not create another interceptors when the others living, so when we re use this component it wiil
            //not create another interceptors
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {

            const { initialized } = this.state;
            if (!initialized) return null;
            
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler