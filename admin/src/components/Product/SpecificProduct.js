import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SpecificProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import IconStyling from '../../styleFunctions'
import CheckBox from './CheckBox';
const axios = require('axios').default;


export default class SpecificProduct extends Component {
    constructor(props) {
        super(props);

        console.log(props.location.state)
        this.state = {

            headState: "",
            imageCarousel: [],
            Products: [],
            GlobalProduct: [],
            Filters: {
                Price: [],
                Rating: []
            }
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:5000/category/${this.props.location.state.categId}/products`)
            .then((response) => {


                let specificCatCard = [];


                if (response.data.Products.length > 0) {

                    for (let k = 0; k < response.data.Products.length; k++) {

                        let data = response.data.Products[k];

                        data.Category = response.data.Category
                        data.catId = response.data._id
                        data.proId = response.data.Products[k]._id

                        specificCatCard.push(
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

                this.setState({
                    Products: specificCatCard,
                    GlobalProduct: response.data.Products
                })

            }).catch((err) => {
                console.log(err.message)
            })
    }


    render() {
        let showFilteredResults = (filters) => {
        }

        let handleFilters = (filters, category) => {
            const newFilters = { ...this.state.Filters }

            if (category === "Price") {
                let priceValues = handlePrice(filters)
                newFilters[category] = priceValues

            }


            showFilteredResults(newFilters)

        }

        let handlePrice = (filters) => {


            let specificCard = []
            for (let i = 0; i < filters.length; i++) {


                for (let k = 0; k < this.state.GlobalProduct.length; k++) {
                    let data = this.state.GlobalProduct[k]

                    if (filters[i] === 4 && parseInt(data.productPrice) > 100 && parseInt(data.productPrice) < 500) {
                        specificCard.push(
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
                    } else if (filters[i] === 3 && parseInt(data.productPrice) > 500 && parseInt(data.productPrice) < 1000) {
                        specificCard.push(
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
                        );
                    } else if (filters[i] === 2 && parseInt(data.productPrice) > 1000 && parseInt(data.productPrice) < 2000) {
                        specificCard.push(
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
                    } else if (filters[i] === 1 && parseInt(data.productPrice) > 2000) {
                        specificCard.push(
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
                Products: specificCard
            })
        }

        return (
            <section className="SpecificCategory">
                <div className="SpecificHeader">
                    <h2> {this.props.location.state.categName}</h2>
                </div>
                <div className="SpecificCatHolder">
                    <div className="FilterCheck">
                        <CheckBox

                            handleFilters={filters => handleFilters(filters, "Price")}
                        />
                    </div>


                    <div className="SpecificHeaderCards">
                        {this.state.Products}
                    </div>
                </div>
            </section>
        )
    }
}
