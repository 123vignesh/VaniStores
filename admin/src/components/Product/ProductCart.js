import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import IconStyling from '../../styleFunctions'


import "./ProductCart.css"

import { DataContext } from '../Context'

const axios = require('axios').default;
export default class ProductCart extends Component {
    static contextType = DataContext;

    constructor(props) {
        super(props);


        this.state = {
            data: [],
            cartId: "",

        }
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
                if (result.data.length === 0) {
                    let array = []
                    array.push(
                        <div className="NoItem">
                            <div>
                                <h2>No Items Found in Your Cart</h2>
                            </div>
                        </div>
                    )

                    this.setState({
                        data: array
                    })
                } else {
                    let array = []
                    for (let i = 0; i < result.data.length; i++) {
                        let payload = result.data[i]
                        array.push(
                            <div className="CartCard">
                                <div className="CartImage">
                                    <img src={payload.productImage} alt="vani"
                                        name="imgSrc"
                                        width="350px" height="350px"
                                        className="imgSrcDetails"
                                        id="imgSrc"
                                    />
                                </div>


                                <div className="DetailCart">
                                    <span className="DetailDiscriptionSpan">
                                        <p className="DetailDiscriptionPara">{payload.productName}</p>
                                    </span>

                                    <span className="productRating">
                                        <FontAwesomeIcon icon={faStar}
                                            style={IconStyling.styleListStarDetail}
                                        />
                                        <FontAwesomeIcon icon={faStar}
                                            style={IconStyling.styleListStarDetail}
                                        />
                                        <FontAwesomeIcon icon={faStar}
                                            style={IconStyling.styleListStarDetail}
                                        />
                                        <FontAwesomeIcon icon={faStar}
                                            style={IconStyling.styleListStarDetail}
                                        />
                                        <FontAwesomeIcon icon={faStarHalf}
                                            style={IconStyling.styleListStarDetail}
                                        />
                                        <span className="Votes">(2,555 Votes)</span>
                                    </span>

                                    <span className="DetailPriceCart">
                                        <div >  ₹<b style={{ marginLeft: "5px" }}>{payload.productPrice}</b>
                                            <span className="Inclusive">( Inclusive of all taxes )</span>
                                        </div>

                                    </span>

                                    <span className="DetailPriceCart">
                                        <div >  <b style={{ fontWeight: "500" }}>Stock:  <span >{payload.productStock}</span></b>

                                        </div>

                                    </span>

                                    <span className="DetailsButtonCart">

                                        <button className="product-button2 detailbutton CartButton" onClick={(e) => this.handleRemove(payload)}>Remove from Cart</button>

                                        <button className="product-button2 detailbutton CartButton" style={{ marginLeft: "20px", paddingLeft: "38px", paddingRight: "38px" }}
                                            onClick={(e) => this.handleRazorPay(payload)}
                                        >Buy Now</button>
                                    </span>

                                </div>
                            </div>
                        )
                    }

                    this.setState({
                        data: array,

                    })
                }


            }).catch((error) => {
                alert(error)
            })
    }


    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    summary = () => {
        return { __html: this.props.location.state.fromProduct.productDiscription }
    }



    handleRazorPay = async (payload) => {
        const res = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        let getCurrentDate = () => {

            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            let separator = "/";
            return `${year} ${separator} ${month < 10 ? `0${month}` : `${month}`} ${separator} ${date}`
        }
        const object = {
            amount: payload.productPrice
        }
        axios.post(`http://localhost:5000/api/createorder`, object).then((data) => {

            console.log(data)
            console.log(data.data.amount)
            let options = {
                "key": "rzp_test_cprzpBZ4CAODGm",
                "amount": data.data.amount,
                "currency": data.data.currency,
                "name": payload.productName,
                "description": "Paying to VaniStores",
                "image": "VaniStoresImage.png",
                "order_id": data.data.id,
                "handler": function (response) {
                    //alert(response.razorpay_payment_id);
                    //alert(response.razorpay_order_id);
                    alert(response.razorpay_signature)
                    var orderData = {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        productName: options.name,
                        paymentDate: getCurrentDate()
                    }
                    console.log(orderData)
                    axios.post(`http://localhost:5000/order`, orderData)
                        .then((result) => {
                            console.log(result);
                            console.log("order Created")
                            alert("Check your email for order details")
                        }).catch((err) => {
                            console.log(err)
                        })
                },
                "prefill": {
                    "name": "userName",
                    "email": "user@example.com",
                    "contact": "9999999999"
                },

                "theme": {
                    "color": "#3399cc"
                }
            };
            console.log(options)
            var rzp1 = new window.Razorpay(options);
            rzp1.open()
        })
    }

    handleRemove = (data) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let headers = {
            'Authorization': bearer
        }
        axios.delete(`http://localhost:5000/cart/${data._id}`, {
            headers: headers
        })
            .then((result) => {

                console.log("Cart Item deleted")
                setTimeout(() => {
                    axios.get(`http://localhost:5000/cart`)
                        .then((result) => {
                            this.context.cart = result.data
                            let array = []
                            for (let i = 0; i < result.data.length; i++) {
                                let payload = result.data[i]
                                array.push(
                                    <div className="CartCard">
                                        <div className="CartImage">
                                            <img src={payload.productImage} alt="vani"
                                                name="imgSrc"
                                                width="350px" height="350px"
                                                className="imgSrcDetails"
                                                id="imgSrc"
                                            />
                                        </div>


                                        <div className="DetailCart">
                                            <span className="DetailDiscriptionSpan">
                                                <p className="DetailDiscriptionPara">{payload.productName}</p>
                                            </span>

                                            <span className="productRating">
                                                <FontAwesomeIcon icon={faStar}
                                                    style={IconStyling.styleListStarDetail}
                                                />
                                                <FontAwesomeIcon icon={faStar}
                                                    style={IconStyling.styleListStarDetail}
                                                />
                                                <FontAwesomeIcon icon={faStar}
                                                    style={IconStyling.styleListStarDetail}
                                                />
                                                <FontAwesomeIcon icon={faStar}
                                                    style={IconStyling.styleListStarDetail}
                                                />
                                                <FontAwesomeIcon icon={faStarHalf}
                                                    style={IconStyling.styleListStarDetail}
                                                />
                                                <span className="Votes">(2,555 Votes)</span>
                                            </span>

                                            <span className="DetailPriceCart">
                                                <div >  ₹<b style={{ marginLeft: "5px" }}>{payload.productPrice}</b>
                                                    <span className="Inclusive">( Inclusive of all taxes )</span>
                                                </div>

                                            </span>

                                            <span className="DetailPriceCart">
                                                <div >  <b style={{ fontWeight: "500" }}>Stock:  <span >{payload.productStock}</span></b>

                                                </div>

                                            </span>

                                            <span className="DetailsButtonCart">

                                                <button className="product-button2 detailbutton CartButton" onClick={(e) => this.handleRemove(payload)}>Remove from Cart</button>

                                                <button className="product-button2 detailbutton CartButton" style={{ marginLeft: "20px", paddingLeft: "38px", paddingRight: "38px" }}
                                                    onClick={(e) => this.handleRazorPay(payload)}

                                                >Buy Now</button>
                                            </span>

                                        </div>




                                    </div>
                                )


                            }

                            this.setState({
                                data: array,

                            })

                        }).catch((error) => {
                            console.log(error)
                        })
                }, 1000)

            }).catch((err) => {
                console.log(err)
            })
    }
    render() {

        return (
            <>

                <section className="CartCollection">
                    {this.state.data}
                </section>

            </>
        )
    }
}
