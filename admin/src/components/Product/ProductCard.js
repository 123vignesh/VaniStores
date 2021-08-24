import React, { Component } from 'react'
import { Link } from 'react-router-dom'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import IconStyling from '../../styleFunctions'


import "./ProductCard.css"
import { DataContext } from '../Context'
import { GetFunction } from '../../AxiosFunctions'
import { categoryUrl } from '../../Link'
import { notifyFailure } from '../../NotifyFunctions'

const axios = require('axios').default;

export default class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Products: "",

        }

    }
    static contextType = DataContext;


    componentDidMount() {
        let result = GetFunction(categoryUrl)

        result
            .then((response) => {

                let array = []
                for (let j = 0; j < response.length; j++) {

                    if (response[j].Products.length > 0) {

                        for (let k = 0; k < response[j].Products.length; k++) {

                            let data = response[j].Products[k];

                            data.Category = response[j].Category
                            data.catId = response[j]._id
                            data.proId = response[j].Products[k]._id

                            if (k === 0) {
                                array.push(
                                    <div style={{ width: "100%" }}>
                                        <h1>{data.Category}</h1>
                                    </div>

                                )
                            }
                            array.push(
                                <div className="product-card">
                                    <div className="card-header">
                                        <img src={`http://localhost:5000/${data.mainImage[0].filename}`} alt="Shoe" className="product-img"
                                            width="350px" height="350px" />
                                    </div>


                                    <div className="card-body">

                                        <h4 className="product-title">{data.productName}</h4>

                                        <h3 className="product-price">  ₹{data.productPrice}</h3>

                                        <span className="product-rating">
                                            <FontAwesomeIcon icon={faStar}
                                                style={IconStyling.styleListStar}
                                            />
                                            <FontAwesomeIcon icon={faStar}
                                                style={IconStyling.styleListStar}
                                            />
                                            <FontAwesomeIcon icon={faStar}
                                                style={IconStyling.styleListStar}
                                            />
                                            <FontAwesomeIcon icon={faStar}
                                                style={IconStyling.styleListStar}
                                            />
                                            <FontAwesomeIcon icon={faStarHalf}
                                                style={IconStyling.styleListStar}
                                            />

                                        </span>
                                    </div>


                                    <div className="card-footer">
                                        <Link to={{
                                            pathname: "/productdetails",
                                            state: { fromProduct: data }

                                        }}
                                        >
                                            <button className="btns btns-secondary">
                                                View Details
                                            </button>

                                        </Link>


                                        <button className="btns btns-primary"
                                            onClick={
                                                () => this.context.addCart(data)

                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                </div>
                            )

                        }


                    }

                }

                this.setState({
                    Products: array,

                })
            }).catch((err) => {
                notifyFailure(err)
            });
    }


    render() {




        return (
            <>

                {this.state.Products}
            </>
        )
    }
}
