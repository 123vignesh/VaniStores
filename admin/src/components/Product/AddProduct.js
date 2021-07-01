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

export default class AddProduct extends Component {

    constructor(props) {
        super(props);

        this.ChildElement = React.createRef();
        this.state = {
            SelectOption: [],
            catId: "",
            Category: "",
            CategoryLabel: "",
            productName: "",
            productPrice: "",
            stock: "",
            gst: "",
            productDiscription: "",
            imgSrc: "imageupload.png",
            imgFile: null,
            img1: "",
            img2: "",
            img3: "",
            imga: "",
            imgb: "",
            imgc: "",
            isUpload: false,
            isUpload2: false,
            isUpload3: false


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
            this.setState({
                imgFile: e.target.files[0],

            })
        }
    }



    handleSubmit = () => {
        if (this.validator.allValid()) {
            let childelement = this.ChildElement.current;

            let formData = new FormData()

            formData.append('Category', this.state.Category)
            formData.append('productName', this.state.productName)
            formData.append('productDiscription', childelement.state.content)
            formData.append('productPrice', this.state.productPrice)
            formData.append('gst', this.state.gst)
            formData.append('stock', this.state.stock)
            //formData.append('imgData', this.state.imgSrc)
            formData.append('mainImage', this.state.imgFile)
            formData.append('mainImage', this.state.imga)
            formData.append('mainImage', this.state.imgb)
            formData.append('mainImage', this.state.imgc)

            /* formData = {
                 Category: this.state.Category,
                 productName: this.state.productName,
                 productDiscription: childelement.state.content,
                 productPrice: this.state.productPrice,
                 gst: this.state.gst,
                 stock: this.state.stock,
                 imgData: this.state.imgSrc
             }
             console.log(formData)
 */
            let url = `http://localhost:5000/category/${this.state.catId}/products`
            axios({
                method: 'post',
                url: url,
                data: formData,

            })
                .then((result) => {
                    console.log(result);
                    console.log("Product created")
                }).catch((err) => {
                    console.log(err)
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
    0 -0.25rem 0rem var(--Secondary-color) inset,
    0 0.75rem 0.5rem #ffffff66 inset;
    `;


        return (



            <div className="AllignProductForm">
                <StyledCard>
                    <div className="ImageUpload">
                        <div className="Imagecontainer">

                            <div className="ImageHolder">
                                <img src={this.state.imgSrc} alt="mainImage"
                                    name="imgSrc"
                                    width="500px" height="500px"
                                    className="imgSrc"
                                    id="imgSrc"
                                />
                            </div>
                            <div className="ImageInput">
                                <input type="file" accept="image/*" name="mainImage" id="input"
                                    onChange={(e) => {
                                        this.handleImage(e)
                                    }} />
                                <div className="label">
                                    <label className="image-upload" htmlFor="input">
                                        Upload your Main Image
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="ExtraImages">

                            <div className="Extra">
                                <img src={this.state.img1}
                                    className="SmallImage"
                                    style={!this.state.isUpload ? IconStyling.SmallImage : IconStyling.SmallImageHidden}
                                    width="140px" height="140px" />
                                <label htmlFor="in">
                                    <FontAwesomeIcon icon={faUpload}
                                        style={!this.state.isUpload ? IconStyling.styleUploadIcon : IconStyling.styleUploadIconHidden}
                                        className="alligningSideBar"
                                    />
                                </label>
                                <input type="file" accept="image/*" name="mainImage" className="input"
                                    id="in"
                                    onChange={(e) => {
                                        let reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                this.setState({
                                                    img1: reader.result, isUpload: true,
                                                    imga: e.target.files[0]
                                                })
                                            }
                                        }
                                        if (e.target.files[0]) {
                                            reader.readAsDataURL(e.target.files[0]);
                                        }

                                    }}
                                />
                            </div>


                            <div className="Extra">
                                <img src={this.state.img2}
                                    className="SmallImage"
                                    style={!this.state.isUpload2 ? IconStyling.SmallImage : IconStyling.SmallImageHidden}
                                    width="140px" height="140px" />
                                <label htmlFor="in2">
                                    <FontAwesomeIcon icon={faUpload}
                                        style={!this.state.isUpload2 ? IconStyling.styleUploadIcon : IconStyling.styleUploadIconHidden}
                                        className="alligningSideBar"
                                    />
                                </label>
                                <input type="file" accept="image/*" name="mainImage" className="input"
                                    id="in2"
                                    onChange={(e) => {
                                        let reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                this.setState({
                                                    img2: reader.result, isUpload2: true,
                                                    imgb: e.target.files[0]
                                                })
                                            }
                                        }
                                        if (e.target.files[0]) {
                                            reader.readAsDataURL(e.target.files[0]);
                                        }

                                    }}
                                />
                            </div>


                            <div className="Extra">
                                <img src={this.state.img3}
                                    className="SmallImage"
                                    style={!this.state.isUpload3 ? IconStyling.SmallImage : IconStyling.SmallImageHidden}
                                    width="140px" height="140px" />
                                <label htmlFor="in3">
                                    <FontAwesomeIcon icon={faUpload}
                                        style={!this.state.isUpload3 ? IconStyling.styleUploadIcon : IconStyling.styleUploadIconHidden}
                                        className="alligningSideBar"
                                    />
                                </label>
                                <input type="file" accept="image/*" name="mainImage" className="input"
                                    id="in3"
                                    onChange={(e) => {
                                        let reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                this.setState({
                                                    img3: reader.result, isUpload3: true,
                                                    imgc: e.target.files[0]
                                                })
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
                                    Category: CategoryLabel.label,
                                    catId: CategoryLabel.value
                                })
                            }}
                            onBlur={() => this.validator.showMessageFor('CategoryLabel')}
                            placeholder={<div style={{ color: "black" }}>Select The Category</div>}
                            styles={IconStyling.SelectOption}
                        />
                        <div style={{ color: "#E75922", marginBottom: "5px" }}>
                            {this.validator.message('CategoryLabel', this.state.CategoryLabel, 'required')}
                        </div>
                        <div style={{ marginBottom: "5px" }}>
                            <input
                                type="text"
                                placeholder="Product Name" className="SignupInputs Pro"
                                required

                                value={this.state.productName}
                                onChange={(e) => {
                                    this.setState({
                                        productName: e.target.value
                                    })
                                }}
                                onBlur={() => this.validator.showMessageFor('productName')}
                            />
                            <div style={{ color: "#E75922" }}>
                                {this.validator.message('productName', this.state.productName, 'required')}
                            </div>
                        </div>
                        <div style={{ marginBottom: "5px" }}>
                            <input type="text" placeholder="Product Price in ₹" className="SignupInputs Pro"
                                required
                                name="productPrice"
                                value={this.state.productPrice}
                                onChange={(e) => {
                                    this.setState({
                                        productPrice: e.target.value
                                    })
                                }}
                                onBlur={() => this.validator.showMessageFor('productPrice')}
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
                                onBlur={() => this.validator.showMessageFor('stock')}
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
                                onBlur={() => this.validator.showMessageFor('gst')}
                            />
                            <div style={{ color: "#E75922" }}>
                                {this.validator.message('gst', this.state.gst, 'required|size:15')}
                            </div>
                        </div>


                        <div className="ProductTextEditor">
                            <TextEditor ref={this.ChildElement} />
                        </div>
                        <div className="allignProductFormbutton">
                            <button type="submit" className="ProductFormButton"
                                onClick={() => {
                                    this.handleSubmit()

                                }}
                            >Create</button>

                        </div>

                    </div>
                </StyledCard>
            </div>



        )
    }
}
