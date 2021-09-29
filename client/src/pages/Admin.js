import React, { useState } from 'react';
import {Container, Button} from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';

const Admin = () => {
    const [brandVisible, setBrandVisibe] = useState(false)
    const [typeVisible, setTypeVisibe] = useState(false)
    const [deviceVisible, setDeviceVisibe] = useState(false)
    return (
        <Container className="d-flex flex-column">
           <Button 
            variant={"outline-dark"} 
            className="mt-2"
            onClick={() => setTypeVisibe(true)}
        >
            add type
        </Button>
           <Button 
            variant={"outline-dark"} 
            className="mt-2"
            onClick={() => setBrandVisibe(true)}
        >
            add brand
        </Button>
           <Button 
            variant={"outline-dark"} 
            className="mt-2"
            onClick={() => setDeviceVisibe(true)}
        >
            add device
        </Button>
           <CreateBrand show={brandVisible} onHide={() => setBrandVisibe(false)}/>
           <CreateDevice show={deviceVisible} onHide={() => setDeviceVisibe(false)}/>
           <CreateType show={typeVisible} onHide={() => setTypeVisibe(false)}/>
        </Container>
    );
};

export default Admin;