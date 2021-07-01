import React, { Component } from "react";
import 'react-responsive-modal/styles.css';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import '../Table/ModalForm.css'
import { Styles } from '../Table/TableStyle'
import Select from "react-select"
import IconStyling from '../../styleFunctions';
import Table from "../Table/Table"
import './Orders.css'
import ModalForm from "../Table/Modal"
import "../Table/ModalForm.css"
import ActionFonts from "../Fonts/ActionFonts"

import { options } from "./options";

toast.configure()
const axios = require('axios').default;

export default class OrderDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FinalData: [],
            open: false,
            createMode: true,
            paymentID: "",
            orderID: "",
            productName: "",
            paymentDate: "",
            DeliveryStatus: "",
            ordNoId: "",
            selectOption: options,
            FinalStatus: ""
        }
    }
    notify = () => toast.info("Orders fetched Successfully", {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 });

    notifyError = (msg) => toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 });


    notifySuccessEdit = () => toast.success("DeliveryStatus updated Successfully", {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 });

    notifySuccessDelete = () => toast.success("Order  Successfully deleted", {
        position: toast.POSITION.TOP_RIGHT
    }, { autoClose: 15000 })

    componentDidMount() {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let headers = {
            'Authorization': bearer
        }
        axios.get(`http://localhost:5000/order`, {
            headers: headers
        })
            .then((response) => {

                var array = []
                for (let j = 0; j < response.data.length; j++) {

                    array.push({
                        paymentID: response.data[j]._id,
                        orderID: response.data[j].orderId,
                        productName: response.data[j].productName,
                        paymentDate: response.data[j].paymentDate,
                        DeliveryStatus: response.data[j].DeliveryStatus,
                        ordNoId: response.data[j]._id,
                        status:
                            <ActionFonts handleEdit={() => {
                                this.handleEdit(j)
                            }} handleDelete={() => {
                                this.handleDelete(j)
                            }} />,
                    })

                }
                this.setState({
                    FinalData: array,


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

                createMode: true
            })
        } else {
            this.setState({
                open: false,

            })
        }
    }
    handleEdit = (j) => {


        if (!this.state.open) {

            this.setState({
                open: true,
                ordNoId: this.state.FinalData[j].ordNoId,
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
            ordNoId: this.state.FinalData[j].ordNoId,

        }, () => {
            console.log(this.state.FinalData[j].ordNoId)
            var url = `http://localhost:5000/order/${this.state.ordNoId}`
            const bearer = 'Bearer ' + localStorage.getItem('token');
            let headers = {
                'Authorization': bearer
            }
            axios.delete(url, {
                headers: headers
            })
                .then((result) => {

                    console.log(result)
                    console.log("Deleted")
                    axios.get(`http://localhost:5000/order`)
                        .then((response) => {

                            var array = []
                            for (let j = 0; j < response.data.length; j++) {

                                array.push({
                                    paymentID: response.data[j]._id,
                                    orderID: response.data[j].orderId,
                                    productName: response.data[j].productName,
                                    paymentDate: response.data[j].paymentDate,
                                    DeliveryStatus: response.data[j].DeliveryStatus,
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

    handleSubmit = () => {

        var url = `http://localhost:5000/order/${this.state.ordNoId}`
        var data = {
            DeliveryStatus: this.state.FinalStatus
        }
        const bearer = 'Bearer ' + localStorage.getItem('token');
        let headers = {
            'Authorization': bearer
        }

        axios.put(url, data, {
            headers: headers
        })
            .then((result) => {

                console.log(result)
                console.log("updated")
                axios.get(`http://localhost:5000/order`, {
                    headers: headers
                })
                    .then((response) => {

                        var array = []
                        for (let j = 0; j < response.data.length; j++) {

                            array.push({
                                paymentID: response.data[j]._id,
                                orderID: response.data[j].orderID,
                                productName: response.data[j].productName,
                                paymentDate: response.data[j].paymentDate,
                                DeliveryStatus: response.data[j].DeliveryStatus,
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
                            this.notifySuccessEdit()
                        })
                    }).catch((err) => {
                        this.notifyError(err.message)
                    });
            }).catch((err) => {
                this.notifyError(err.message)
            })
        this.handleClick()
    }


    render() {
        const columns = [

            {
                Header: "Order Id",
                accessor: "orderID"
            },
            {
                Header: "Payment Id",
                accessor: "paymentID"
            },
            {
                Header: "Product",
                accessor: "productName",

            },
            {
                Header: "Order Date",
                accessor: "paymentDate"
            },

            {
                Header: "Delivery Status",
                accessor: "DeliveryStatus",

            },
            {
                Header: "Action",
                accessor: "status",

            },
        ]



        return (
            <>
                <ModalForm open={this.state.open} onClose={this.handleClick} >
                    <form className="ModalForm orderModal">
                        <Select
                            value={this.state.DeliveryStatus}
                            options={this.state.selectOption}
                            onChange={DeliveryStatus => {

                                this.setState({
                                    DeliveryStatus,
                                    FinalStatus: DeliveryStatus.label
                                })
                            }}
                            placeholder={<div style={{ color: "black" }}>Delivery Status</div>}
                            styles={IconStyling.SelectOptionOrder}
                        />
                        <div className="AlignOrderButton">
                            <button
                                type="submit"

                                className="SignupButton Ord"
                                onClick={(e) => {

                                    e.preventDefault()
                                    this.handleSubmit()
                                }}
                            >Update Delivery Status</button>
                        </div>
                    </form>
                </ModalForm>
                <Styles>
                    <Table columns={columns} data={this.state.FinalData} />
                </Styles>
            </>
        );
    }
}


