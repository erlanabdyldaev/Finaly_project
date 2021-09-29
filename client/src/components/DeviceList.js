import { observer } from 'mobx-react-lite';
import React, { useContext} from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { getProductsData } from '../http/deviceAPI';
import { Context } from '../index';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {

    const history = useHistory()
    const {device} = useContext(Context)

    const handleValue = async (e) => {
        const search = new URLSearchParams(history.location.search);
        search.set("q", e.target.value);
        history.push(`${history.location.pathname}?${search.toString()}`);
        let result = await getProductsData(e.target.value);
        device.setDevices(result.rows)
      };
      console.log(device)
    return (
        <Row style={{display: 'flex'}}>
            <input 
                style={{margin: '10px'}}
                placeholder="search"
                onChange={(e) => handleValue(e)}
            />
            {device.devices.map(device => 
                 <DeviceItem key={device.id} device={device}/>   
            )}
        </Row>
    );
});

export default DeviceList;