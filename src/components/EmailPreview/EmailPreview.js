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
                            }) : null}
                            <div style={{ width: '100%', backgroundColor: 'red', height: '10px' }}></div><div style={{ textAlign: 'center' }}><img src='https://i.pcmag.com/imagery/reviews/01dP5ocnTcOaAH6ehSjwkCf-9.fit_scale.size_760x427.v1569480976.png' alt='logo' width='50%' /></div><div style={{ width: '80%', margin: 'auto', fontSize: 20 }}>Dear Last Pass User,<br /><br />We wanted to alert you that, recently, our team discovered and immediately blocked suspicious activity on our network. Some user vault data was taken including email addresses and passwords.<br /><br />To be sure that your information was NOT compromised, we have built <a href='https://www.google.com' style={{ color: 'blue', textDecoration: 'underline' }}>this secure website</a> where you can enter your last pass login information and we can tell you if your account was one that was compromised.<br /><br />We apologize for the inconvenience, but ultimately we believe this will better protect Last Pass users. Thank you for your understanding, and for using Last Pass.<br /><br />Regards,<br />The Last Pass Team<br /><br /><div style={{ margin: 'auto', textAlign: 'center', width: '20%', height: '40px', backgroundColor: 'red', color: 'white', textDecoration: 'underline', textDecorationColor: 'blue' }}>Learn More</div></div>
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
