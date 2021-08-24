import React, { Component } from "react";

import Table from "../Table/Table"
import ActionFonts from "../Fonts/ActionFonts"
import ModalForm from "../Table/Modal"
import SimpleReactValidator from 'simple-react-validator';

import "../Table/ModalForm.css"
import 'react-responsive-modal/styles.css';
import { Styles } from '../Table/TableStyle'

import { notifySuccess, notifyFailure, notifyInfo } from '../../NotifyFunctions';
import { categoryUrl } from '../../Link';
import { PostFunction, GetFunction, DeleteFunction, EditFunction } from '../../AxiosFunctions.js'


export default class CategoryTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            FinalData: [],
            open: false,
            createMode: true,
            Category: "",
            CategoryDiscription: "",
            catId: "",
        }
        this.validator = new SimpleReactValidator()
    }


    componentDidMount() {

        let result = GetFunction(categoryUrl)
        result
            .then((response) => {

                let array = []
                for (let j = 0; j < response.length; j++) {

                    array.push({
                        categoryID: response[j]._id,
                        category: response[j].Category,
                        description: response[j].CategoryDiscription,
                        status:
                            <ActionFonts handleEdit={() => {
                                this.handleEdit(j)
                            }} handleDelete={() => {
                                this.handleDelete(j)
                            }} />,
                    })

                }
                this.setState({
                    FinalData: array
                }, () => {
                    notifyInfo("Categories fetched Successfully")
                })
            }).catch((err) => {
                notifyFailure(err.message)

            });

    }

    handleClick = () => {

        if (!this.state.open) {
            this.setState({
                open: true,
                Category: "",
                CategoryDiscription: "",
                createMode: true
            })

        } else {
            this.setState({
                open: false,
                Category: "",
                CategoryDiscription: "",
            })
            this.validator.hideMessages();
        }
    }

    handleEdit = (j) => {

        if (!this.state.open) {

            this.setState({
                open: true,
                Category: this.state.FinalData[j].category,
                CategoryDiscription: this.state.FinalData[j].description,
                catId: this.state.FinalData[j].categoryID,
                createMode: false
            })
        } else {
            this.setState({
                open: false,
                createMode: true
            })
        }
    }

    handleDelete = (j) => {
        this.setState({
            catId: this.state.FinalData[j].categoryID,

        }, () => {

            let Delurl = `http://localhost:5000/category/${this.state.catId}`

            let ResultDelete = DeleteFunction(Delurl)

            ResultDelete
                .then((response) => {

                    if (response.data.deleted) {
                        let DataAfterDeletion = GetFunction(categoryUrl)
                        DataAfterDeletion
                            .then((response) => {

                                let array = []
                                for (let i = 0; i < response.length; i++) {

                                    array.push({
                                        category: response[i].Category,
                                        description: response[i].CategoryDiscription,
                                        categoryID: response[i]._id,
                                        status:
                                            <ActionFonts handleEdit={() => {
                                                this.handleEdit(i)
                                            }}
                                                handleDelete={() => {
                                                    this.handleDelete(i)
                                                }} />,
                                    })

                                }
                                this.setState({
                                    FinalData: array
                                }, () => {
                                    notifySuccess("Deleted  Successfully")
                                })
                            }).catch((err) => {
                                notifyFailure(err.message)
                            });
                    } else {
                        notifyFailure("Deletion unsuccessful")
                    }

                }).catch((err) => {
                    notifyFailure(err.message)
                })
        })



    }


    handleSubmit = (FinalData) => {
        if (this.validator.allValid()) {
            if (this.state.createMode) {
                let CategoryPost = PostFunction(FinalData[0], categoryUrl)

                CategoryPost
                    .then((result) => {

                        if (result.data.Created) {
                            let GetCategoryAfterPost = GetFunction(categoryUrl)

                            GetCategoryAfterPost
                                .then((response) => {

                                    let array = []
                                    for (let i = 0; i < response.length; i++) {

                                        array.push({
                                            category: response[i].Category,
                                            description: response[i].CategoryDiscription,
                                            categoryID: response[i]._id,
                                            status:
                                                <ActionFonts handleEdit={() => {
                                                    this.handleEdit(i)
                                                }} handleDelete={() => {
                                                    this.handleDelete(i)
                                                }} />,
                                        })

                                    }
                                    this.setState({
                                        FinalData: array
                                    }, () => {
                                        notifySuccess("Category added  Successfully")
                                    })
                                }).catch((err) => {
                                    notifyFailure(err.message)
                                });
                        } else {
                            notifyFailure("Category Creation Unsuccessful")
                        }

                    })
                    .catch((err) => {
                        notifyFailure(err.message)
                    })

                this.handleClick()
            }
            else {

                let Editurl = `http://localhost:5000/category/${this.state.catId}`
                let PutCategoryResult = EditFunction(FinalData[0], Editurl)
                PutCategoryResult
                    .then((result) => {
                        if (result.data.Updated) {

                            let updateResult = GetFunction(categoryUrl)

                            updateResult
                                .then((response) => {

                                    var array = []
                                    for (let i = 0; i < response.length; i++) {

                                        array.push({
                                            category: response[i].Category,
                                            description: response[i].CategoryDiscription,
                                            categoryID: response[i]._id,
                                            status:
                                                <ActionFonts handleEdit={() => {
                                                    this.handleEdit(i)
                                                }} handleDelete={() => {
                                                    this.handleDelete(i)
                                                }} />,
                                        })

                                    }
                                    this.setState({
                                        FinalData: array
                                    }, () => {
                                        notifySuccess("Category updated Successfully")
                                    })
                                }).catch((err) => {
                                    notifyFailure(err)
                                });

                            this.handleClick()
                        } else {
                            notifyFailure("Updation unsuccessful")
                        }

                    }).catch((err) => {
                        notifyFailure(err)
                    })
            }

        } else {

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const columns = [

            {
                Header: "Category",
                accessor: "category"
            },
            {
                Header: "Description",
                accessor: "description",

            },
            {
                Header: "Action",
                accessor: "status"
            }
        ]

        return (
            <>
                <ModalForm open={this.state.open} onClose={this.handleClick} >
                    <form className="ModalForm">
                        <div style={{ marginBottom: "5px" }}>
                            <input
                                type="text"
                                placeholder="Category" className="SignupInputs"
                                name="Category"
                                value={this.state.Category}
                                onChange={(e) => {
                                    this.setState({
                                        Category: e.target.value
                                    })
                                }}
                                onBlur={() => this.validator.hideMessageFor('Category')}
                            />
                            <div className="CategoryError" >
                                {this.validator.message('Category', this.state.Category, 'required|alpha_space')}
                            </div>
                        </div>
                        <div>
                            <input type="text" placeholder="Category Descrition" className="SignupInputs Disc"
                                required
                                name="CategoryDiscription"
                                value={this.state.CategoryDiscription}
                                onChange={(e) => {
                                    this.setState({
                                        CategoryDiscription: e.target.value
                                    })
                                }}
                                onBlur={() => this.validator.showMessageFor('CategoryDiscription')}
                            />
                            <div className="CategoryError" >
                                {this.validator.message('CategoryDiscription', this.state.CategoryDiscription, 'required|max:50')}
                            </div>
                        </div>
                        <div className="AllignCreate">
                            <button
                                type="submit"
                                className="SignupButton"
                                onClick={(e) => {
                                    e.preventDefault()
                                    var Finaldata = [
                                        {
                                            Category: this.state.Category,
                                            CategoryDiscription: this.state.CategoryDiscription
                                        }
                                    ]
                                    this.handleSubmit(Finaldata)
                                }}
                            >create</button>
                        </div>
                    </form>
                </ModalForm>


                <Styles>
                    <div className="AllignButton">
                        <button className="AddNew"
                            onClick={this.handleClick}
                        >Add New</button>
                    </div>

                    <Table columns={columns} data={this.state.FinalData} />
                </Styles>
            </>
        );
    }
}