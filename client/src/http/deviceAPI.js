import {$authHost, $host} from './index'
import axios from 'axios'



export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type', )
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand',)
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const {data} = await $host.get('api/device',  {params: {
        typeId, brandId, page, limit
    }})
    return data
}

//update
export const updateDevice = async (id, {name, price}) => {
    const {data} = await axios.patch(`http://localhost:5000/api/device/${id}`,  {name, price})
    return data
}
//delete
export const deleteDevices = async (id) => {
    const {data} = await axios.delete(`http://localhost:5000/api/device/${id}`)
    console.log(data);
    fetchDevices()
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id )
    return data
}

export const getProductsData = async (q) => {
    const {data} = await axios.get(`http://localhost:5000/api/device?${window.location.search}`,  {params: {
     q
    }})
    return data
}