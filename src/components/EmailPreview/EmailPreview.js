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
import React, { useState, useEffect } from 'react';
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
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

import axios from 'axios';
import { EmitFlags } from 'typescript';

function EmailPreview(props) {
    const [data, setData] = useState([]);
    const [eventsDelivered, setEventsDelivered] = useState([]);
    const [eventsOpened, setEventsOpened] = useState([]);
    const [eventsClicked, setEventsClicked] = useState([]);
    const [loading, setLoading] = useState();

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

    const lastPass = () => {
        return (
            <div>
                <div style={{ width: '100%', backgroundColor: 'red', height: '10px' }}>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <img src='https://i.pcmag.com/imagery/reviews/01dP5ocnTcOaAH6ehSjwkCf-9.fit_scale.size_760x427.v1569480976.png' alt='logo' width='50%' />
                </div>
                <div style={{ width: '80%', margin: 'auto', fontSize: 20 }}>Dear Last Pass User,
                    <br />
                    <br />
                    We wanted to alert you that, recently, our team discovered and immediately blocked suspicious activity on our network. Some user vault data was taken including email addresses and passwords.
                    <br />
                    <br />
                    To be sure that your information was NOT compromised, we have built{' '}
                    <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                        this secure website
                    </a>
                    {' '}where you can enter your last pass login information and we can tell you if your account was one that was compromised.
                    <br />
                    <br />
                    We apologize for the inconvenience, but ultimately we believe this will better protect Last Pass users. Thank you for your understanding, and for using Last Pass.<br />
                    <br />
                    Regards,
                    <br />
                    The Last Pass Team
                    <br />
                    <br />
                </div>
                <div style={{ margin: 'auto', textAlign: 'center', width: '20%', height: '40px', backgroundColor: 'red', color: 'white', textDecoration: 'underline', textDecorationColor: 'blue' }}>
                    Learn More
                </div>
            </div>
        )
    }

    const docuSign = () => {
        return (
            <div>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <div >
                        <img src='https://kingcountynews.files.wordpress.com/2020/03/docusignlogo.png' alt='logo' width='25%' />
                    </div>
                    <div >
                        <img src='https://quanexus.com/wp-content/uploads/2019/06/Security-Alert.png' alt='logo' width='100%' />
                    </div>
                    <div >
                        A new email address, authenticator app or phone number has been added to your account. This information will be used to provide additional security when accessing DocuSign.
                        <br />
                        <br />
                        Please log in to your Docu Sign account to change your settings.
                    </div>
                </div>
                <br />
                <div style={{ width: '100%', margin: 'auto', backgroundColor: 'lightgrey' }}>
                    <div style={{ width: '80%', margin: 'auto' }}>
                        About Docusign
                        <br />
                        Sign Documents electronically in just minutes. It's safe,secure, and legally binding. Whether you're in an office, at home, or on-the-go, --or even across the globe - DocuSign provides a professional trusted solution for Digital Transaction Management.
                        <br />
                        <br />
                        <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                            <img src='https://cdn-icons-png.flaticon.com/512/0/532.png' alt='logo' width='20px' />
                            Download the DocuSign App
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    const microsoftOne = () => {
        return (
            <div>
                <div>
                    Microsoft account
                </div>
                <br />
                <div style={{ color: 'blue', fontSize: 24 }}>
                    Your Password Changed
                </div>
                <br />
                <br />

                Your password for the Microsoft account WHAT TO PUT HERE was changed.
                <br />
                <br />

                If this was you, then you can safely ignore this email.
                <br />
                <br />

                Security info used:
                <br />
                County/region: WHAT TO PUT HERE
                <br />
                Platform: WHAT TO PUT HERE
                <br />
                Browser: WHAT TO PUT HERE
                <br />
                IP address: WHAT TO PUT HERE
                <br />
                <br />
                If this wasn't you, your account has been compromised. Please follow these steps:
                <br />
                <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                    1. Reset your password.
                </a>
                <br />
                <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                    2. Review your security info.
                </a>
                <br />
                <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                    3. Learn how to make your account more secure.
                </a>
                <br />
                <br />
                You can also{' '}
                <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                    opt out
                </a>
                {' '}or change where you receive security notifications.
                <br />
                <br />
                Thanks,
                <br />
                <br />
                The Microsoft account team
            </div>
        )
    }

    const chaseBlueBorder = () => {
        return (
            <div style={{ width: '90%', backgroundColor: 'blue', height: '50px', margin: 'auto' }}>

            </div>
        )
    }

    const chase = () => {
        return (
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '70%', margin: 'auto' }}>
                    <div style={{ flex: '33%', margin: 'auto' }}>
                        Log in to Online or Mobile Banking to view your latest eStatement.
                    </div>
                    <div style={{ flex: '33%', textAlign: 'center' }}>
                        <a href='https://www.google.com' style={{ textDecoration: 'underline', color: 'black' }}>
                            View as Web page
                        </a>
                    </div>
                    <div style={{ flex: '33%', textAlign: 'center' }}>
                        <a href='https://www.google.com' style={{ textDecoration: 'underline', color: 'black' }}>
                            Log in to Online Banking
                        </a>
                    </div>
                </div>
                <div style={{ width: '80%', margin: 'auto' }}>
                    <img src='https://1000logos.net/wp-content/uploads/2021/05/Chase-logo.png' alt='logo' width='25%' />
                </div>
                {chaseBlueBorder()}
                <br />
                <div style={{ width: '70%', margin: 'auto' }}>
                    Date: {getTodaysDate()}
                    <br />
                    Account Number ending in 8632
                    <br />
                    <br />
                    An ATM withdrawl or debit card purchase exceeds the amount you have chosen. To view more information on this transaction log in to{' '}
                    <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                        Chase Online Banking
                    </a>
                    {' '}  or our {' '}
                    <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                        U.S. Bank Mobile Banking Website.
                    </a>
                    <br />
                    <br />
                    When you log in to view your statement, you can also view your most recent account activity, set up customized account alerts, update your contact information or ATM PIN number and more.
                    <br />
                    <br />
                    Please do not respond to this message. If you would like to contact us, please log in to Chase{' '}
                    <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                        Online Banking
                    </a>
                    {' '}and send a message to Customer Service.
                    <br />
                    <br />
                    You are receiving this email because you signed up for alerts through Chase Online Banking. If you no longer wish to receive this alert, log in to Chase{' '}
                    <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>
                        Online Banking
                    </a>
                    {' '}and go to My Alerts, select Account Alerts, and temporarily disable or delete this alert.
                    <br />
                    <br />
                    Chase Online Banking
                </div>
                <br />
                {chaseBlueBorder()}
            </div>
        )
    }

    return (
        <>
            <Row>
                <Col md="12">
                    <Card style={{ border: '1px solid black' }}>
                        <CardHeader>
                            <CardTitle tag="h5">Email Preview</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <br />
                            <CardSubtitle tag="h5" style={{ fontWeight: 'bold' }}>{props.subject}</CardSubtitle>
                            <br />
                            {`${props.sendFromName ? props.sendFromName : ''} ${props.sendFromEmail ? "<" + props.sendFromEmail + ">" : ''}`}
                            <br />
                            to
                            {props.sendTo ? props.sendTo.map((recipient, index) => {
                                return ` ${recipient[0]} <${recipient[1]}>,`
                            }) : props.manualRecipientName || props.manualRecipientEmail ? ` ${props.manualRecipientName ? props.manualRecipientName : null} <${props.manualRecipientEmail ? props.manualRecipientEmail : null}>` : null}
                            {props.template === 'lastPass' ? lastPass() : props.template === 'docuSign' ? docuSign() : props.template === 'microsoftOne' ? microsoftOne() : props.template === 'chase' ? chase() : null}
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
        </>
        // <>
        //     <Row>
        //         <Col md="12">
        //             <Card style={{ border: '1px solid black' }}>
        //                 <CardHeader>
        //                     <CardTitle tag="h5">Email Preview</CardTitle>
        //                 </CardHeader>
        //                 <CardBody>
        //                     <br />
        //                     <CardSubtitle tag="h5" style={{ fontWeight: 'bold' }}>{props.subject}</CardSubtitle>
        //                     <br />
        //                     {`${props.sendFromName ? props.sendFromName : ''} ${props.sendFromEmail ? "<" + props.sendFromEmail + ">" : ''}`}
        //                     <br />
        //                     to
        //                     {props.sendTo ? props.sendTo.map((recipient, index) => {
        //                         return ` ${recipient[0]} <${recipient[1]}>,`
        //                     }) : null}
        //                     <br />
        //                     <br />
        //                     Hi Team,
        //                     <br />
        //                     <br /> Please check out my project <span><a href='www.google.com'>here </a></span>
        //                     and let me know what you think.
        //                     <br />
        //                     <br />
        //                     Thanks,
        //                     <br />
        //                     <br />
        //                     {props.sendFromName}
        //                 </CardBody>
        //                 <CardFooter>
        //                     <Row>
        //                         <div className="update ml-auto mr-auto">
        //                             <Button
        //                                 className="btn-round"
        //                                 color="primary"
        //                                 type="submit"
        //                             >
        //                                 Send Email
        //                             </Button>
        //                         </div>
        //                     </Row>
        //                 </CardFooter>
        //             </Card>
        //         </Col>
        //     </Row>
        // </>
    );
}



export default EmailPreview;
