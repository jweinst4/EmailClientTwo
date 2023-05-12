/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Button,
    FormGroup,
    Form,
    Input,
    Nav,
    NavItem,
    CardSubtitle,
} from "reactstrap";
// core components
import {
    dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart
} from "variables/charts.js";

import Papa from 'papaparse'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SendEmail() {
    const [sendFromName, setSendFromName] = useState();
    const [sendFromEmail, setSendFromEmail] = useState();
    const [subject, setSubject] = useState();
    const [sendTo, setSendTo] = useState();
    const [show, setShow] = useState(false);


    function sendgrid(sendFromName, sendFromEmail, subject, sendToArray) {
        console.log('send grid');
        console.log('send from', sendFromName);
        console.log('send from email', sendFromEmail);
        console.log('subj', subject)
        return new Promise((resolve, reject) => {
            axios({
                url: "https://api.sendinblue.com/v3/smtp/email",
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "api-key": "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",
                    "content-type": "application/json"
                },
                data: {
                    "sender": {
                        "name": sendFromName,
                        "email": sendFromEmail
                    },
                    "to": sendToArray,
                    "subject": subject,
                    "htmlContent": `<html><head></head><body><p>Hi Team,</p>Please check out my project <a href='https://www.w3schools.com'>here</a> and let me know what you think.</p>
                    <p>Thanks,</p><p>${sendFromName}</p></body></html>`

                }
            })
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    console.log('error');
                    console.log(err)
                    reject(err)
                })
        })
    }

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: false,
            skipEmptyLines: true,
            complete: function (results) {
                console.log('results', results.data);
                setSendTo(results.data);
            },
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        const sendToArray = sendTo.map(recipient => {
            return {
                "name": recipient[0],
                "email": recipient[1]
            }
        })
        sendgrid(sendFromName, sendFromEmail, subject, sendToArray)
        setSendFromName();
        setSendFromEmail();
        setSendTo();
        setSubject();
        setShow(true);
        toast('You Sent An Email!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "light",
            type: 'success'
        });

    }

    return (
        <>
            <div className="content">
                <div>
                    <ToastContainer />
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className="pr-1" md="5">
                            <FormGroup>
                                <label>Send From - Name</label>
                                <Input
                                    style={{ border: '1px solid black' }}
                                    defaultValue=""
                                    type="text"
                                    onChange={(e) => { setSendFromName(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="5">
                            <FormGroup>
                                <label>Send From - Email</label>
                                <Input
                                    style={{ border: '1px solid black' }}
                                    defaultValue=""
                                    type="text"
                                    onChange={(e) => { setSendFromEmail(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="5">
                            <FormGroup >
                                <label>Subject</label>
                                <Input
                                    style={{ border: '1px solid black' }}
                                    defaultValue=""
                                    type="text"
                                    onChange={(e) => { setSubject(e.target.value) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="5">
                            <FormGroup>
                                <label>To</label>
                                <Input
                                    id="fileSelect"
                                    type="file"
                                    size='sm'
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={changeHandler}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card style={{ border: '1px solid black' }}>
                                <CardHeader>
                                    <CardTitle tag="h5">Email Preview</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <br />
                                    <CardSubtitle tag="h5" style={{ fontWeight: 'bold' }}>{subject}</CardSubtitle>
                                    <br />
                                    {`${sendFromName ? sendFromName : ''} ${sendFromEmail ? "<" + sendFromEmail + ">" : ''}`}
                                    <br />
                                    to
                                    {sendTo ? sendTo.map((recipient, index) => {
                                        return ` ${recipient[0]} <${recipient[1]}>,`
                                    }) : null}
                                    <br />
                                    <br />
                                    Hi Team,
                                    <br />
                                    <br /> Please check out my project <span><a href='www.google.com'>here </a></span>
                                    and let me know what you think.
                                    <br />
                                    <br />
                                    Thanks,
                                    <br />
                                    <br />
                                    {sendFromName}
                                </CardBody>
                                <CardFooter>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                            >
                                                Send Email
                                            </Button>
                                        </div>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}

export default SendEmail;
