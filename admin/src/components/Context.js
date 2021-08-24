import React, { Component } from 'react'

export const DataContext = React.createContext();
const axios = require('axios').default;
export class DataProvider extends Component {
    state = {
        cart: [],
        total: 0
    }

    componentDidMount() {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let headers = {
            'Authorization': bearer
        }
        axios.get(`http://localhost:5000/cart`, {
            headers: headers
        })
            .then((result) => {

                if (result.data.length > 0) {
                    this.setState({
                        cart: result.data,

                    })

                }
            }).catch((err) => {
                if (err.message !== "Request failed with status code 401") {
                    alert(err.message)
                }

            })

    }

    addCart = (data) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let headers = {
            'Authorization': bearer
        }
        var CartData = {

            productImage: data.imgData,
            productName: data.productName,
            productPrice: data.productPrice,
            productStock: data.stock,
            AddedToCart: true

        }
        axios.post(`http://localhost:5000/cart`, CartData, {
            headers: headers
        })
            .then((result) => {

                console.log(result)
                console.log("Product added to cart")

                this.setState({
                    cart: result.data
                })
            }
            ).catch((error) => {
                console.log(error)
            })

    }

    fetchCart = () => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let headers = {
            'Authorization': bearer
        }
        axios.get(`http://localhost:5000/cart`, {
            headers: headers
        })
            .then((result) => {

                if (result.data.length > 0) {
                    this.setState({
                        cart: result.data,

                    })

                }
            }).catch((err) => {
                this.setState({
                    cart: [],

                })
                return
            })
    }
    render() {
        const { cart } = this.state;
        const { addCart, fetchCart } = this;

        return (
            <DataContext.Provider value={{ addCart, cart, fetchCart }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}