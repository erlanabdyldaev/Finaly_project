import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { updateDevice } from '../http/deviceAPI';

const DeviceUpdate = () => {
    const history = useHistory()
    const [name , setName] = useState('')
    const [price , setPrice] = useState('')
    const {id} = useParams()
    function updated(e) {
        e.preventDefault()
        updateDevice(id, {name, price})
        history.push('/')
    }

    return (
        <div >           
            <form>
                <input 
                    placeholder="name" 
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    placeholder="price" 
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={(e) => updated(e)}>update</button>
            </form>
        </div>
    );
};

export default DeviceUpdate;