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
import {
    Row,
    Col,
    FormGroup,
    Label,
    Form,
    Input,
} from "reactstrap";

import EmailPreview from '../components/EmailPreview/EmailPreview';
import Papa from 'papaparse'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const lastPass = "<html><body><br><div style='width:100%;background:red;height:10px'></div><div style='text-align: center;'><img src='https://i.pcmag.com/imagery/reviews/01dP5ocnTcOaAH6ehSjwkCf-9.fit_scale.size_760x427.v1569480976.png' alt='logo' width='50%' /></div><div style='width:80%;margin:auto'>Dear Last Pass User,<br><br>We wanted to alert you that, recently, our team discovered and immediately blocked suspicious activity on our network. Some user vault data was taken including email addresses and passwords.<br><br>To be sure that your information was NOT compromised, we have built <a href='https://www.google.com' style='color:blue; text-decoration:underline' }}>this secure website </a> where you can enter your last pass login information and we can tell you if your account was one that was compromised.<br><br>We apologize for the inconvenience, but ultimately we believe this will better protect Last Pass users. Thank you for your understanding, and for using Last Pass.<br><br>Regards,<br>The Last Pass Team</div><br><div style='margin:auto;text-align: center;width:100px;height:40px;background-color:red;color:white;text-decoration:underline;text-decoration-color:blue'>Learn More</div></body></html>"

const docuSign = "<html><body><div><div style='width:80%;margin:auto'><div><img src='https://kingcountynews.files.wordpress.com/2020/03/docusignlogo.png' alt='logo' width='25%'/></div><div ><img src='https://www.shutterstock.com/image-illustration/warning-security-alert-secured-website-260nw-421220896.jpg' alt='logo' width='100%' /></div><div>A new email address, authenticator app or phone number has been added to your account. This information will be used to provide additional security when accessing DocuSign.<br /><br />Please log in to your Docu Sign account to change your settings.</div></div><br /><div style='width:100%;margin:auto;background:lightgrey'><div style='width:80%;margin:auto'>About Docusign<br />Sign Documents electronically in just minutes. It's safe,secure, and legally binding. Whether you're in an office, at home, or on-the-go, --or even across the globe - DocuSign provides a professional trusted solution for Digital Transaction Management.<br /><br /><a href='https://www.google.com' style='color:blue; text-decoration:underline' }}> <img src='https://cdn-icons-png.flaticon.com/512/0/532.png' alt='logo' width='20px' />Download the DocuSign App </a></div></div></body></html>"

function SendEmail() {
    const [sendFromName, setSendFromName] = useState();
    const [sendFromEmail, setSendFromEmail] = useState();
    const [subject, setSubject] = useState();
    const [sendTo, setSendTo] = useState();
    const [template, setTemplate] = useState('lastPass');

    function sendgrid(sendFromName, sendFromEmail, subject, sendToArray) {
        return new Promise((resolve, reject) => {
            axios({
                url: "https://api.brevo.com/v3/smtp/email",
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
                    "htmlContent": template === 'lastPass' ? lastPass : template === 'docuSign' ? docuSign : lastPass,
                    "subject": subject,
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
                <FormGroup tag="fieldset" onChange={(event) => setTemplate(event.target.value)}>
                    <legend>Choose Your Template</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="lastPass" defaultChecked />{' '}
                            LastPass
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="docuSign" />{' '}
                            DocuSign
                        </Label>
                    </FormGroup>
                </FormGroup>
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
                    <EmailPreview
                        subject={subject}
                        sendFromName={sendFromName}
                        sendFromEmail={sendFromEmail}
                        sendTo={sendTo}
                        template={template}
                    />
                </Form>
            </div>
        </>
    );
}

export default SendEmail;
