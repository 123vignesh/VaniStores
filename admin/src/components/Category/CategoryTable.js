import React, { Component } from "react";
import 'react-responsive-modal/styles.css';
import SimpleReactValidator from 'simple-react-validator';
import { Styles } from '../Table/TableStyle'


import Table from "../Table/Table"
import ActionFonts from "../Fonts/ActionFonts"
import ModalForm from "../Table/Modal"
import "../Table/ModalForm.css"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const axios = require('axios').default;


toast.configure()
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
        this.validator = new SimpleReactValidator({ autoForceUpdate: this })
    }


    notify = () => toast.info("Categories fetched Successfully", {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 });

    notifyError = (msg) => toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 });

    notifySuccessEdit = () => toast.success("Category updated Successfully", {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 });

    notifySuccessDelete = () => toast.success("Deleted  Successfully", {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 })

    notifySuccessAdded = () => toast.success("Category added  Successfully", {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 })



    componentDidMount() {
        axios.get(`http://localhost:5000/category`)
            .then((response) => {

                var array = []
                for (let j = 0; j < response.data.length; j++) {

                    array.push({
                        categoryID: response.data[j]._id,
                        category: response.data[j].Category,
                        description: response.data[j].CategoryDiscription,

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
                    this.notify()
                })
            }).catch((err) => {
                this.notifyError(err.message)
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

            var url = `http://localhost:5000/category/${this.state.catId}`
            axios.delete(url)
                .then((result) => {

                    console.log(result)

                    axios.get(`http://localhost:5000/category`)
                        .then((response) => {

                            var array = []
                            for (let i = 0; i < response.data.length; i++) {

                                array.push({
                                    category: response.data[i].Category,
                                    description: response.data[i].CategoryDiscription,
                                    categoryID: response.data[i]._id,

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
                                this.notifySuccessDelete()
                            })
                        }).catch((err) => {
                            this.notifyError(err.message)
                        });
                }).catch((err) => {
                    this.notifyError(err.message)
                })
        })



    }


    handleSubmit = (FinalData) => {
        if (this.validator.allValid()) {
            if (this.state.createMode) {
                axios.post(`http://localhost:5000/category`, FinalData[0])
                    .then((result) => {
                        console.log("Category Created");
                        console.log(result)
                        axios.get(`http://localhost:5000/category`)
                            .then((response) => {

                                var array = []
                                for (let i = 0; i < response.data.length; i++) {

                                    array.push({
                                        category: response.data[i].Category,
                                        description: response.data[i].CategoryDiscription,
                                        categoryID: response.data[i]._id,

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
                                    this.notifySuccessAdded()
                                })
                            }).catch((err) => {
                                this.notifyError(err.message)
                            });
                    })
                    .catch((err) => {
                        this.notifyError(err.message)
                    })

                this.handleClick()
            }



            else {

                var url = `http://localhost:5000/category/${this.state.catId}`

                axios.put(url, FinalData[0])
                    .then((result) => {
                        console.log(result)
                        console.log("Category updated")
                        axios.get(`http://localhost:5000/category`)
                            .then((response) => {

                                var array = []
                                for (let i = 0; i < response.data.length; i++) {

                                    array.push({
                                        category: response.data[i].Category,
                                        description: response.data[i].CategoryDiscription,
                                        categoryID: response.data[i]._id,

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
                                    this.notifySuccessEdit()
                                })
                            }).catch((err) => {
                                this.notifyError()
                            });

                        this.handleClick()
                    }).catch((err) => {
                        this.notifyError()
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
                            <div style={{ color: "#E75922" }}>
                                {this.validator.message('Category', this.state.Category, 'required|alpha_space')}
                            </div>
                        </div>
                        <div>
                            <input type="text" placeholder="Category Descrition" className="SignupInputs Disc" required
                                name="CategoryDiscription"
                                value={this.state.CategoryDiscription}
                                onChange={(e) => {
                                    this.setState({
                                        CategoryDiscription: e.target.value
                                    })
                                }}
                                onBlur={() => this.validator.showMessageFor('CategoryDiscription')}
                            />
                            <div style={{ color: "#E75922" }}>
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