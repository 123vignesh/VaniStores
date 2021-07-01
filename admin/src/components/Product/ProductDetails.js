import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import IconStyling from '../../styleFunctions'


import './ProductDetails.css'
import { DataContext } from '../Context'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousels from './Carousel'


require('dotenv').config()
const axios = require('axios').default;
export default class ProductDetails extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);

        console.log(props.location.state)
        this.state = {
            data: props.location.state.fromProduct,
            obj: "",
            orderResult: "",
            imageCarousel: []
        }

    }

    componentDidMount() {

        let imageArray = [];

        let im = this.props.location.state.fromProduct.mainImage
        for (let i = 0; i < this.props.location.state.fromProduct.mainImage.length; i++) {
            imageArray.push(

                <div>
                    <img alt="" src={`http://localhost:5000/${im[i].filename}`} width="500px" />

                </div >
            )
        }

        this.setState({
            imageCarousel: imageArray
        })


    }

    render() {
        const { addCart } = this.context;
        let loadScript = (src) => {
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

        let summary = () => {
            return { __html: this.props.location.state.fromProduct.productDiscription }
        }
        let getCurrentDate = () => {

            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            let separator = "/";
            return `${year} ${separator} ${month < 10 ? `0${month}` : `${month}`} ${separator} ${date}`
        }

        let handleBuyNow = async () => {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?')
                return
            }


            const object = {
                amount: this.state.data.productPrice
            }
            axios.post(`http://localhost:5000/api/createorder`, object).then((data) => {

                console.log(data)
                console.log(data.data.amount)
                let options = {
                    "key": "rzp_test_cprzpBZ4CAODGm",
                    "amount": data.data.amount,
                    "currency": data.data.currency,
                    "name": this.state.data.productName,
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







        return (
            <>

                <section className="ProductDetails">
                    <div className="GobackDetail">
                        <Link to="/product">
                            <button className="product-button2">Go Back</button>
                        </Link>
                    </div>
                    <div className="DetailContainer">
                        <div className="DetailImage">

                            <Carousels>
                                {this.state.imageCarousel}
                            </Carousels>

                        </div>

                        <div className="DetailDiscription">
                            <span className="DetailDiscriptionSpan">
                                <p className="DetailDiscriptionPara">{this.state.data.productName} </p>
                            </span>

                            <span className="product-rating">
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

                            <span className="DetailPrice">
                                <div >  ₹<b style={{ marginLeft: "5px" }}>{this.state.data.productPrice}</b>
                                    <span className="Inclusive">( Inclusive of all taxes )</span>
                                </div>

                            </span>

                            <span className="DetailPrice">
                                <div >  <b style={{ fontWeight: "500" }}>Stock:  <span >{this.state.data.stock}</span></b>

                                </div>

                            </span>

                            <span className="DetailsButton">

                                <button className="product-button2 detailbutton"
                                    onClick={() => addCart(this.state.data)}
                                >Add to Cart</button>



                                <button className="product-button2 detailbutton" style={{ marginLeft: "20px", paddingLeft: "38px", paddingRight: "38px" }}
                                    onClick={handleBuyNow}

                                >Buy Now</button>

                                <Link to={{
                                    pathname: "/editproduct",
                                    state: { fromProduct: this.state.data }

                                }}>
                                    <button className="product-button2 detailbutton" style={{ marginLeft: "20px", paddingLeft: "38px", paddingRight: "38px" }}>Edit Item</button>
                                </Link>
                            </span>

                        </div>

                    </div>

                    <div className="CompleteDiscription">
                        <h2>About this Item</h2>
                        <div dangerouslySetInnerHTML={summary()}></div>
                    </div>
                </section>

            </>
        )
    }
}
