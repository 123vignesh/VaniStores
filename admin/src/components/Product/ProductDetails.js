import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Select from "react-select"

import { States, KarnatakaState, TamilNaduState, UpState } from "../Orders/options";
import { notifyFailure, notifySuccess, notifyInfo } from '../../NotifyFunctions'
import { addressUrl } from '../../Link'

import IconStyling from '../../styleFunctions'


import './ProductDetails.css'
import { DataContext } from '../Context';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousels from './Carousel'

import GoogleMaps from './GoogleMap';
import { PostFunction } from '../../AxiosFunctions';

require('dotenv').config()
const axios = require('axios').default;

export default class ProductDetails extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);


        this.state = {
            data: props.location.state.fromProduct,
            obj: "",
            orderResult: "",
            imageCarousel: [],
            counter: 1,
            buying: false,
            address: false,
            City: "",
            State: "",
            Area: "",
            email: "",
            state: "",
            city: "",
            pinCode: "",
            cityOption: []
        }

    }

    componentDidMount() {

        let imageArray = [];

        let im = this.props.location.state.fromProduct.mainImage
        for (let i = 0; i < this.props.location.state.fromProduct.mainImage.length; i++) {
            imageArray.push(

                <div>
                    <img alt="" src={`http://localhost:5000/${im[i].filename}`} />

                </div >
            )
        }

        this.setState({
            imageCarousel: imageArray
        })
        window.addEventListener('popstate', (event) => {
            this.props.history.push('/home')
        });
    }


    handleIncrement = () => {
        if (this.state.counter < this.props.location.state.fromProduct.stock) {
            this.setState({ counter: this.state.counter + 1 });
        }

    };

    handleDecrement = () => {
        if (this.state.counter > 1) {
            this.setState({ counter: this.state.counter - 1 });
        }

    };

    fetchCity = (state) => {
        if (state === "Karnataka") {
            this.setState({
                cityOption: KarnatakaState
            })
        } else if (state === "Tamil Nadu") {
            this.setState({
                cityOption: TamilNaduState
            })

        } else if (state === "Uttar Pradesh") {
            this.setState({
                cityOption: UpState
            })
        }
    };

    render() {
        const { addCart } = this.context;
        const displayCounter = this.state.counter > 0;
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

            let a = localStorage.getItem('token')
            let b = localStorage.getItem('admin')
            if (a !== null) {

                if (b === "false") {

                    Address()

                }
                else if (b === "true") {
                    notifyInfo("Admins cannot Buy Products")
                }
            } else {

                this.notifyLoginfirst("First Login to Buy Books")
            }
        }

        let Address = () => {
            this.setState({
                address: true
            })
        }

        let RazorPay = async () => {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?')
                return
            }

            const bearer = 'Bearer ' + localStorage.getItem('token');
            let headers = {
                'Authorization': bearer
            }
            let TotalPrice = String(parseInt(this.state.data.productPrice) * this.state.counter)
            const object = {
                amount: TotalPrice
            }
            axios.post(`http://localhost:5000/api/createorder`, object, {
                headers: headers
            }).then((data) => {

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
            }).catch((err) => {
                console.log(err.message)
            })
        }

        let handleAddressSubmit = (e) => {

            let addressData = {
                state: this.state.State,
                city: this.state.city.label,
                area: this.state.area,
                pinCode: this.state.pinCode,
                email: this.state.email,
            }
            let result = PostFunction(addressData, addressUrl)
            result.then((response) => {

                if (response.data.Added) {

                    notifySuccess("Address Added Successfully")
                    this.setState({
                        address: false
                    }, () => {
                        RazorPay()
                    })

                } else {
                    notifyFailure("Technical Glitch")
                }
            }).catch((err) => {
                notifyFailure(err)
            })
            e.preventDefault()
        }


        return (
            <>

                <section className="ProductDetails">
                    <div className="GobackDetail">
                        <Link to="/product">
                            <button className="btns btns-primary" style={{ backgroundColor: "#c82930" }}>Go Back</button>
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

                            <span>
                                <ButtonGroup size="large" aria-label="outlined secondary button group">
                                    <Button
                                        onClick={this.handleIncrement} style={{ fontSize: "15px" }}>+</Button>
                                    {displayCounter && <Button className="Inc">{this.state.counter}</Button>}
                                    {displayCounter && <Button onClick={this.handleDecrement} >-</Button>}
                                </ButtonGroup>

                            </span>



                            <span className="DetailsButton">

                                <button
                                    className="btns btns-primary"
                                    onClick={() => addCart(this.state.data)}
                                    style={{ backgroundColor: "#bdb32a", paddingLeft: "38px", paddingRight: "38px", color: "black" }}
                                >Add to Cart</button>



                                <button className="btns btns-primary" style={{ marginLeft: "20px", paddingLeft: "38px", paddingRight: "38px", backgroundColor: "#bdb32a", color: "black" }}
                                    onClick={handleBuyNow}

                                >Buy Now</button>

                                <Link to={{
                                    pathname: "/editproduct",
                                    state: { fromProduct: this.state.data }

                                }}>
                                    <button className="btns btns-primary" style={{
                                        marginLeft: "20px", paddingLeft: "38px", paddingRight: "38px",
                                        backgroundColor: "#bdb32a",
                                        color: "black"
                                    }}>Edit Item</button>
                                </Link>
                            </span>



                            <div className={this.state.address ? "VisiAddress" : "NonVisiAddress"}>
                                <div><h2>Delivery Address</h2></div>
                                <form>
                                    <div className="InputDiv">

                                        <Select

                                            value={this.state.state}
                                            options={States}
                                            onChange={(state) => {
                                                this.setState({
                                                    State: state.label,
                                                    state
                                                }, () => {

                                                    this.fetchCity(this.state.State)
                                                })
                                            }}

                                            placeholder={<div style={{ color: "black" }}>State</div>}
                                            styles={IconStyling.SelectOption}
                                        />
                                    </div>


                                    <div className="InputDiv">
                                        <Select

                                            value={this.state.city}
                                            options={this.state.cityOption}
                                            onChange={(city) => {
                                                this.setState({

                                                    City: city.label,
                                                    city
                                                })
                                            }}

                                            placeholder={<div style={{ color: "black" }}>City</div>}
                                            styles={IconStyling.SelectOption}
                                        />
                                    </div>

                                    <div className="InputDiv">

                                        <input
                                            style={{ width: "95%" }}
                                            type="text"
                                            className="SignupInputs"
                                            value={this.state.email}
                                            placeholder="Email"
                                            required
                                            onChange={
                                                (e) => {
                                                    this.setState({
                                                        email: e.target.value
                                                    })
                                                }
                                            }

                                        />
                                    </div>



                                    <div className="InputDiv">

                                        <input
                                            style={{ width: "95%" }}
                                            type="text"
                                            className="SignupInputs"
                                            value={this.state.area}
                                            placeholder="Area"
                                            onChange={
                                                (e) => {
                                                    this.setState({
                                                        area: e.target.value
                                                    })
                                                }
                                            }

                                        />
                                    </div>

                                    <div className="InputDiv">

                                        <input
                                            style={{ width: "95%" }}
                                            type="text"
                                            className="SignupInputs"
                                            value={this.state.pinCode}
                                            placeholder="Pin Code"
                                            onChange={
                                                (e) => {
                                                    this.setState({
                                                        pinCode: e.target.value
                                                    })
                                                }
                                            }

                                        />
                                    </div>

                                    <div className="SignButtonDiv">
                                        <button type="submit" className="SignupButton"
                                            onClick={(e) => { handleAddressSubmit(e) }}
                                        >Submit</button>
                                    </div>
                                </form>
                            </div>



                        </div>

                    </div>

                    <div className="CompleteDiscription">
                        <h2>About this Book</h2>
                        <div dangerouslySetInnerHTML={summary()}></div>
                    </div>
                </section>

            </>
        )
    }
}
