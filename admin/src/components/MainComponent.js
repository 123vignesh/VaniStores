import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



import Dashboard from './Dashboard/Dashboard'
import Category from './Category/Category'
import Footer from './Footer/Footer'
import Order from './Orders/Orders';
import AddProduct from './Product/AddProduct';
import Signup from './Authenticate/Signup';
import Login from './Authenticate/Login';
import Email from './Authenticate/Email'
import Product from './Product/Product';
import ProductDetails from './Product/ProductDetails';
import ProductCart from './Product/ProductCart';
import EditProduct from './Product/EditProduct';
import Home from './Home/Home';
import Headers from './header'

import { loginUser, logoutUser } from '../Redux/ActionCreators';
import SpecificProduct from './Product/SpecificProduct';
import ResetPassword from './Authenticate/ResetPassword';





const mapStateToProps = state => {

    return {
        auth: state.auth
    }
}


const mapDispatchToProps = (dispatch) => ({

    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),

});



class MainComponent extends Component {

    render() {
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        return (
            <>
                <Headers
                    auth={this.props.auth}
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}
                />
                <Switch>
                    <Route exact path="/home" component={Home} />

                    <Route path="/dashboard" component={Dashboard} />

                    <Route path="/category" component={Category} />

                    <Route path="/forgotpassword" component={Email} />

                    <Route path="/resetpassword/:id/:token" component={ResetPassword} />


                    <Route path="/addproduct" component={AddProduct} />

                    <Route path="/product" component={Product} />

                    <Route path="/specificproduct" component={SpecificProduct} />

                    <Route path="/editproduct" component={EditProduct} />

                    <Route path="/productdetails" component={ProductDetails} />

                    <Route path="/cart" component={ProductCart} />

                    <Route path="/order" component={Order} />

                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={() => <Login
                        auth={this.props.auth}
                        loginUser={this.props.loginUser}
                        logoutUser={this.props.logoutUser} />}

                    />

                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </>

        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
