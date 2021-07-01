import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator';


import styled from "styled-components";
import "./Product.css"
import TextEditor from '../TextEditor/TextEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import Select from "react-select"
import IconStyling from '../../styleFunctions';

const axios = require('axios').default;

export default class EditProduct extends Component {
    constructor(props) {
        super(props);


        console.log(props.location.state)
        let data = props.location.state.fromProduct

        this.ChildElement = React.createRef();
        this.state = {

            SelectOption: [],
            Category: data.Category,
            CategoryLabel: "",
            tempPlace: data.Category,
            productName: data.productName,
            productPrice: data.productPrice,
            stock: data.stock,
            gst: data.gst,
            productDiscription: data.productDiscription,
            imgSrc: data.imgData,
            img1: "",
            img2: "",
            img3: "",
            isUpload: false,
            isUpload2: false,
            isUpload3: false,
            catId: data.catId,
            proId: data.proId

        }
        this.validator = new SimpleReactValidator()
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/category`)
            .then((response) => {

                var array = []
                for (let j = 0; j < response.data.length; j++) {

                    array.push({
                        "value": response.data[j]._id,
                        "label": response.data[j].Category,
                    })

                }
                this.setState({
                    SelectOption: array
                })
            }).catch((err) => {
                console.log(err)
            });
    }

    handleImage = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ imgSrc: reader.result })
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    handleUpdate = () => {
        if (this.validator.allValid()) {
            let childelement = this.ChildElement.current;

            var ProductData = [{
                Category: this.state.Category,
                productName: this.state.productName,
                productDiscription: childelement.state.content,
                productPrice: this.state.productPrice,
                gst: this.state.gst,
                stock: this.state.stock,
                imgData: this.state.imgSrc
            }]

            console.log(ProductData)

            axios.put(`http://localhost:5000/category/${this.state.catId}/products/${this.state.proId}`, ProductData[0])
                .then((result) => {
                    console.log(result)
                    console.log("Product updated")

                }).catch((error) => {
                    console.log(error)
                })
        } else {
            this.validator.showMessages();

            this.forceUpdate();
        }
    }

    render() {
        const StyledCard = styled.div`
      margin: 0 0 1rem;
      display:flex;
      
      padding: 1rem;
      background:var(  --Selecting-color) ;
      border: 4px solid var(--Quarterinary-color);
      background-clip: border-box;
      border-radius: 1rem;
      min-width: 800px;
      height:fit-content;
      padding-bottom:10px;
      box-shadow: 0 1rem 1.25rem 0 #12151a,
    0 -0.25rem 1.5rem var(--Secondary-color) inset,
    0 0.75rem 0.5rem #ffffff66 inset,
    0 0.25rem 0.5rem 0 var(--Primary-color) inset;
    `;
        return (
            <>


                <div className="AllignProductForm">

                    <StyledCard>

                        <div className="ImageUpload">
                            <div className="Imagecontainer">

                                <div className="ImageHolder">
                                    <img src={this.state.imgSrc} alt=""
                                        name="imgSrc"
                                        width="500px" height="500px"
                                        className="imgSrc"
                                        id="imgSrc"
                                    />
                                </div>
                                <div className="ImageInput">
                                    <input type="file" accept="image/*" name="image-upload" id="input" onChange={(e) => {
                                        this.handleImage(e)
                                    }} />
                                    <div className="label">
                                        <label className="image-upload" htmlFor="input">
                                            Update your Main Image
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="ExtraImages">

                                <div className="Extra">
                                    <img src="imageupload.png"
                                        className="SmallImage"
                                        style={!this.state.isUpload ? IconStyling.SmallImage : IconStyling.SmallImageHidden}
                                        width="140px" height="140px" />
                                    <label htmlFor="in">
                                        <FontAwesomeIcon icon={faUpload}
                                            style={!this.state.isUpload ? IconStyling.styleUploadIcon : IconStyling.styleUploadIconHidden}
                                            className="alligningSideBar"
                                        />
                                    </label>
                                    <input type="file" accept="image/*" name="image-upload" className="input"
                                        id="in"
                                        onChange={(e) => {
                                            let reader = new FileReader();
                                            reader.onload = () => {
                                                if (reader.readyState === 2) {
                                                    this.setState({ img1: reader.result, isUpload: true })
                                                }
                                            }
                                            if (e.target.files[0]) {
                                                reader.readAsDataURL(e.target.files[0]);
                                            }

                                        }}
                                    />
                                </div>


                                <div className="Extra">
                                    <img src="imageupload.png"
                                        className="SmallImage"
                                        style={!this.state.isUpload2 ? IconStyling.SmallImage : IconStyling.SmallImageHidden}
                                        width="140px" height="140px" />
                                    <label htmlFor="in2">
                                        <FontAwesomeIcon icon={faUpload}
                                            style={!this.state.isUpload2 ? IconStyling.styleUploadIcon : IconStyling.styleUploadIconHidden}
                                            className="alligningSideBar"
                                        />
                                    </label>
                                    <input type="file" accept="image/*" name="image-upload" className="input"
                                        id="in2"
                                        onChange={(e) => {
                                            let reader = new FileReader();
                                            reader.onload = () => {
                                                if (reader.readyState === 2) {
                                                    this.setState({ img2: reader.result, isUpload2: true })
                                                }
                                            }
                                            if (e.target.files[0]) {
                                                reader.readAsDataURL(e.target.files[0]);
                                            }

                                        }}
                                    />
                                </div>


                                <div className="Extra">
                                    <img src="imageupload.png"
                                        className="SmallImage"
                                        style={!this.state.isUpload3 ? IconStyling.SmallImage : IconStyling.SmallImageHidden}
                                        width="140px" height="140px" />
                                    <label htmlFor="in3">
                                        <FontAwesomeIcon icon={faUpload}
                                            style={!this.state.isUpload3 ? IconStyling.styleUploadIcon : IconStyling.styleUploadIconHidden}
                                            className="alligningSideBar"
                                        />
                                    </label>
                                    <input type="file" accept="image/*" name="image-upload" className="input"
                                        id="in3"
                                        onChange={(e) => {
                                            let reader = new FileReader();
                                            reader.onload = () => {
                                                if (reader.readyState === 2) {
                                                    this.setState({ img3: reader.result, isUpload3: true })
                                                }
                                            }
                                            if (e.target.files[0]) {
                                                reader.readAsDataURL(e.target.files[0]);
                                            }

                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="ProductForm">

                            <Select
                                value={this.state.CategoryLabel}
                                options={this.state.SelectOption}
                                onChange={CategoryLabel => {
                                    this.setState({
                                        CategoryLabel,
                                        Category: CategoryLabel.label
                                    })
                                }}
                                placeholder={<div style={{ color: "black" }}>{this.state.tempPlace}</div>}
                                styles={IconStyling.SelectOption}
                            />
                            <div style={{ color: "#E75922", marginBottom: "5px" }}>
                                {this.validator.message('CategoryLabel', this.state.Category, 'required')}
                            </div>


                            <div style={{ marginBottom: "5px" }}>
                                <input type="text" placeholder="Product Name" className="SignupInputs Pro"
                                    required
                                    name="productName"
                                    value={this.state.productName}
                                    onChange={(e) => {
                                        this.setState({
                                            productName: e.target.value
                                        })
                                    }}
                                />
                                <div style={{ color: "#E75922" }}>
                                    {this.validator.message('productName', this.state.productName, 'required')}
                                </div>
                            </div>

                            <div style={{ marginBottom: "5px" }}>
                                <input type="text" placeholder="Product Price" className="SignupInputs Pro"
                                    required
                                    name="productPrice"
                                    value={this.state.productPrice}
                                    onChange={(e) => {
                                        this.setState({
                                            productPrice: e.target.value
                                        })
                                    }}
                                />
                                <div style={{ color: "#E75922" }}>
                                    {this.validator.message('productPrice', this.state.productPrice, 'required|numeric|min:0,num')}
                                </div>
                            </div>

                            <div style={{ marginBottom: "5px" }}>
                                <input type="number" placeholder="Stock" className="SignupInputs Pro"
                                    required
                                    name="stock"
                                    value={this.state.stock}
                                    onChange={(e) => {
                                        this.setState({
                                            stock: e.target.value
                                        })
                                    }}
                                />
                                <div style={{ color: "#E75922" }}>
                                    {this.validator.message('stock', this.state.stock, 'required')}
                                </div>
                            </div>

                            <div style={{ marginBottom: "5px" }}>
                                <input type="text" placeholder="GST" className="SignupInputs Pro"
                                    required
                                    name="gst"
                                    value={this.state.gst}
                                    onChange={(e) => {
                                        this.setState({
                                            gst: e.target.value
                                        })
                                    }}
                                />
                                <div style={{ color: "#E75922" }}>
                                    {this.validator.message('gst', this.state.gst, 'required|size:15')}
                                </div>
                            </div>

                            <div className="ProductTextEditor">
                                <TextEditor disc={this.state.productDiscription} ref={this.ChildElement} />
                            </div>
                            <div className="allignProductFormbutton">
                                <button type="submit" className="ProductFormButton"
                                    onClick={() => {
                                        this.handleUpdate()

                                    }}
                                >Update</button>

                            </div>

                        </div>
                    </StyledCard>
                </div>



            </>
        )
    }
}
