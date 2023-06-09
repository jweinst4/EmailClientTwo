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

const getTodaysDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${month}/${day}/${year}`;

    return (
        currentDate
    )
}

const lastPass = "<html><body><br><div style='width:100%;background:red;height:10px'></div><div style='text-align: center;'><img src='https://i.pcmag.com/imagery/reviews/01dP5ocnTcOaAH6ehSjwkCf-9.fit_scale.size_760x427.v1569480976.png' alt='logo' width='50%' /></div><div style='width:80%;margin:auto'>Dear Last Pass User,<br><br>We wanted to alert you that, recently, our team discovered and immediately blocked suspicious activity on our network. Some user vault data was taken including email addresses and passwords.<br><br>To be sure that your information was NOT compromised, we have built <a href='https://www.google.com' style='color:blue; text-decoration:underline' }}>this secure website </a> where you can enter your last pass login information and we can tell you if your account was one that was compromised.<br><br>We apologize for the inconvenience, but ultimately we believe this will better protect Last Pass users. Thank you for your understanding, and for using Last Pass.<br><br>Regards,<br>The Last Pass Team</div><br><div style='margin:auto;text-align: center;width:100px;height:40px;background-color:red;color:white;text-decoration:underline;text-decoration-color:blue'>Learn More</div></body></html>"

const docuSign = "<html><body><div><div style='width:80%;margin:auto'><div><img src='https://kingcountynews.files.wordpress.com/2020/03/docusignlogo.png' alt='logo' width='25%'/></div><div ><img src='https://quanexus.com/wp-content/uploads/2019/06/Security-Alert.png' alt='logo' width='100%' /></div><div>A new email address, authenticator app or phone number has been added to your account. This information will be used to provide additional security when accessing DocuSign.<br /><br />Please log in to your Docu Sign account to change your settings.</div></div><br /><div style='width:100%;margin:auto;background:lightgrey'><div style='width:80%;margin:auto'>About Docusign<br />Sign Documents electronically in just minutes. It's safe,secure, and legally binding. Whether you're in an office, at home, or on-the-go, --or even across the globe - DocuSign provides a professional trusted solution for Digital Transaction Management.<br /><br /><a href='https://www.google.com' style='color:blue; text-decoration:underline' }}> <img src='https://cdn-icons-png.flaticon.com/512/0/532.png' alt='logo' width='20px' />Download the DocuSign App </a></div></div></body></html>"

const microsoftOne = "<html><body><div><div>Microsoft account</div><br /><div style='color:blue;font-size: 24px'}}>Your Password Changed</div><br /><br />Your password for the Microsoft account jweinst4@gmail.com was changed.<br /><br />If this was you, then you can safely ignore this email.<br /><br />Security info used:<br />County/region: United States<br />Platform: iOS<br />Browser: Safari<br />IP address: 77.196.86.10<br /><br />If this wasn't you, your account has been compromised. Please follow these steps:<br /><a href='https://www.google.com' style='color:blue;textDecoration:underline'>1. Reset your password.</a><br /><a href='https://www.google.com' style='color:blue;textDecoration:underline'>2. Review your security info.</a><br /><a href='https://www.google.com' style='color:blue;textDecoration:underline' }}>3. Learn how to make your account more secure.</a><br /><br />You can also <a href='https://www.google.com' style='color:blue;textDecoration:underline' }}>opt out</a> or change where you receive security notifications.<br /><br />Thanks,<br /><br />The Microsoft account team</div></body></html>"

const chase = `<html><body><div><div style='display:flex;flex-wrap:wrap;width:70%;margin:auto' }}><div style='flex:33%;margin:auto'>Log in to Online or Mobile Banking to view your latest eStatement.</div><div style='flex:33%;text-align:center'><a href='https://www.google.com' style='text-decoration: underline;color:black'>View as Web page</a></div><div style='flex:33%;text-align:center'><a href='https://www.google.com' style='text-decoration:underline;color:black'>Log in to Online Banking</a></div></div><div style='width:80%;margin:auto'> <img src='https://1000logos.net/wp-content/uploads/2021/05/Chase-logo.png' alt='logo' width='25%' /></div><div style='width:90%;background-color:blue; height:50px;margin:auto'></div><br /><div style='width:70%;margin:auto'>Date: ${getTodaysDate()}<br />Account Number ending in 8632<br /><br />An ATM withdrawl or debit card purchase exceeds the amount you have chosen. To view more information on this transaction log in to <a href='https://www.google.com' style='color:blue;textDecoration:underline'>Chase Online Banking</a> or our  <a href='https://www.google.com' style='color:blue;textDecoration:underline'>U.S. Bank Mobile Banking Website.</a><br /><br />When you log in to view your statement, you can also view your most recent account activity, set up customized account alerts, update your contact information or ATM PIN number and more.<br /><br />Please do not respond to this message. If you would like to contact us, please log in to Chase <a href='https://www.google.com' style='color:blue;textDecoration:underline'>Online Banking</a> and send a message to Customer Service.<br /><br />You are receiving this email because you signed up for alerts through Chase Online Banking. If you no longer wish to receive this alert, log in to Chase <a href='https://www.google.com' style='color:blue;textDecoration:underline'>Online Banking</a> and go to My Alerts, select Account Alerts, and temporarily disable or delete this alert.<br /><br />Chase Online Banking</div><br /><div style='width:90%;background-color:blue; height:50px;margin:auto'></div></div></body></html>`

function SendEmail() {
    const [sendFromName, setSendFromName] = useState();
    const [sendFromEmail, setSendFromEmail] = useState();
    const [subject, setSubject] = useState();
    const [sendTo, setSendTo] = useState();
    const [template, setTemplate] = useState('lastPass');
    const [useCSVRecipientList, setUseCSVRecipientList] = useState(true);
    const [manualRecipientName, setManualRecipientName] = useState();
    const [manualRecipientEmail, setManualRecipientEmail] = useState();

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
                    "htmlContent": template === 'lastPass' ? lastPass : template === 'docuSign' ? docuSign : template === 'microsoftOne' ? microsoftOne : template === 'chase' ? chase : null,
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

    const toggleRecipientMethod = () => {
        setUseCSVRecipientList(!useCSVRecipientList);
        setManualRecipientName();
        setManualRecipientEmail();
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
        let sendToArray = [];
        if (sendTo) {
            sendToArray = sendTo.map(recipient => {
                return {
                    "name": recipient[0],
                    "email": recipient[1]
                }
            })
        }
        else {
            sendToArray = [
                {
                    "name": manualRecipientName,
                    "email": manualRecipientEmail
                }
            ]
        }

        sendgrid(sendFromName, sendFromEmail, subject, sendToArray)
        setSendFromName();
        setSendFromEmail();
        setSendTo();
        setSubject();
        setManualRecipientEmail();
        setManualRecipientName();
        setUseCSVRecipientList(true);

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
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="microsoftOne" />{' '}
                            MicrosoftOne
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="chase" />{' '}
                            Chase
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
                                {useCSVRecipientList ? <Label>Upload CSV Below (or <span style={{ color: 'blue', cursor: 'grab' }} onClick={() => { toggleRecipientMethod() }}>click here</span> to enter recipient manually)</Label> : <Label>Enter Recipient Below (or <span style={{ color: 'blue', cursor: 'grab' }} onClick={() => { toggleRecipientMethod() }}>click here</span> to upload via CSV file)</Label>}
                                {useCSVRecipientList ? <Input
                                    id="fileSelect"
                                    type="file"
                                    size='sm'
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={changeHandler}
                                /> : <FormGroup >
                                    <label>Enter Recipient Full Name</label>
                                    <Input
                                        style={{ border: '1px solid black' }}
                                        defaultValue=""
                                        type="text"
                                        onChange={(e) => { setManualRecipientName(e.target.value) }}
                                    />
                                    <label>Enter Recipient Email</label>
                                    <Input
                                        style={{ border: '1px solid black' }}
                                        defaultValue=""
                                        type="text"
                                        onChange={(e) => { setManualRecipientEmail(e.target.value) }}
                                    />
                                </FormGroup>}

                            </FormGroup>
                        </Col>
                    </Row>
                    <EmailPreview
                        subject={subject}
                        sendFromName={sendFromName}
                        sendFromEmail={sendFromEmail}
                        sendTo={sendTo}
                        template={template}
                        manualRecipientName={manualRecipientName}
                        manualRecipientEmail={manualRecipientEmail}
                    />
                </Form>
            </div>
        </>
    );
}

export default SendEmail;
