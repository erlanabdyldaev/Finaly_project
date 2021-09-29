import React, { useEffect, useState } from 'react';
import { Container , Col, Image, Row, Card, Button} from 'react-bootstrap';
import {useParams} from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI';

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row>
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card>
                        <h3>{device.price}</h3>
                        <Button variant={"outline-dark"}>add basket</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex">
                {device.info.map(info =>
                       <Row key={info.id}>
                           {info.title}: {info.description}
                       </Row> 
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;