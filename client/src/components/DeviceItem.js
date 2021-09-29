import React, { useContext } from 'react';
import {Card, Col, Image} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { DEVICE_ROUTE, UPDATE_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { deleteDevices } from '../http/deviceAPI';

const DeviceItem = ({device}) => {
    const {user} = useContext(Context)

    const history = useHistory()

    

    return (
        <Col md={3} >
            <Card style={{width: 160, cursor: 'pointer', border: '1px solid black'}}>
                <Image onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)} width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div >
                        <div> rating:{device.rating}</div>
                        <div> price:{device.price}</div>
                    
                        <div>name:{device.name}</div>
                </div>
                {user.isAuth ?
                <div>
                    <button onClick={() => deleteDevices(device.id)}> delete </button>
                    <button onClick={() => history.push(UPDATE_ROUTE+"/"+device.id)}> update </button>
                </div>
                :
                null
                }    

            </Card>
        </Col>
    );
};

export default DeviceItem;