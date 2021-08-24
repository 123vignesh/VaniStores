import React, { Component } from 'react'

import concatenated from './dummyData'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import HomeCategories from './HomeCategories';
import Slider from './HomeSlider'
import './Home.css'

import AutoComplete from './AutoComplete';
import SimpleForm from '../ChatBot/Chatbot';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            productData: []
        }

    }

    componentDidMount() {

        concatenated()
            .then((result) => {
                this.setState({
                    data: result
                })
            }).catch(result => {
                console.log(result);
            })


    }
    handleHomeViewClick = () => {

        this.props.history.push({
            pathname: "/productdetails",
            state: { formProduct: this.state.productData }
        })
    }
    render() {
        return (
            <>
                <section className="HomeSection">

                    <div className="HomeBanner">
                        <div className="SearchCard">
                            <div className="SearchHead">
                                <h2 style={{ marginTop: 0, marginBottom: 0, fontWeight: "500" }}>Dream up</h2>
                                <p style={{ marginTop: 0, marginBottom: 0, fontSize: "22px" }}>
                                    Get the Classiest Books to enhance your knowledge
                                </p>
                            </div>
                            <AutoComplete />
                        </div>
                    </div>


                    <div className="cardBlog">
                        <div className="thumbnail"><img className="left" src={"https://cdn2.hubspot.net/hubfs/322787/Mychefcom/images/BLOG/Header-Blog/photo-culinaire-pexels.jpg"} /></div>
                        <div className="right">
                            <h1>Why Vani Stores</h1>
                            <div className="author"><img src="https://randomuser.me/api/portraits/men/95.jpg" />
                                <h2>We Offer</h2>
                            </div>
                            <div className="separator"></div>
                            <ul className="Facility">
                                <li className="FacilityList">
                                    <FontAwesomeIcon icon={faStar} />  <span className="NameFacility"> Fastest Delivery</span>
                                </li >
                                <li className="FacilityList">
                                    <FontAwesomeIcon icon={faStar} /><span className="NameFacility">   24x7 Customer Support</span>
                                </li>
                                <li className="FacilityList">
                                    <FontAwesomeIcon icon={faStar} /> <span className="NameFacility">   Quality Books
                                    </span>
                                </li>
                                <li className="FacilityList">
                                    <FontAwesomeIcon icon={faStar} />   <span className="NameFacility">   Exchange offers
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <h5>Since</h5>
                        <h6>2020 JANUARY</h6>

                    </div>
                    <Slider heading="Example Slider" slides={this.state.data} head={"New Arrival"}

                        onClick={() => {
                            this.handleHomeViewClick()
                        }} />



                    <Slider heading="Example Slider" slides={this.state.data} head={"Top Seller"} />

                    <HomeCategories />
                </section>

                <SimpleForm />

            </>
        )
    }
}
