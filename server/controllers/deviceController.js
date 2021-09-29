const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize');


class DeviceController {

    //create device
    async create(req,res, next) {
        try{

            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if(info){
                info = JSON.parse(info)
                info.forEach(i => 
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })    
                )
            }
    
    
            return res.json(device)

        } catch (e) {

            next(ApiError.badRequest(e.message))
        }
    }

    //get all device
    async getAll(req,res) {
        let {brandId, typeId, limit, page, q} = req.query
        console.log(q)
        page = page || 1
        limit = limit || 9
        let offset = page * limit -limit
        let devices;
        if(q){
            console.log(q + " worked");
            devices = await Device.findAndCountAll({
                where: {
                      name: {
                        [Op.iLike]: q + "%",
                      },
                    }, 
                    offset,
                    limit 
              }
              )
              console.log(devices, "   -- devices");
        }
        else if(!brandId && !typeId){    
                devices = await Device.findAndCountAll({limit, offset})
              
        }
        else if (brandId && !typeId){
            console.log('brand')
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }   
        else if(!brandId && typeId){
            console.log('type')
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        else if(brandId && typeId){
            console.log('type&brand')
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    // get one device
    async getOne(req,res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }



    //update a todo
    async update(req, res, next){
        try {
            
            const {id} = req.params
            const {name, price} = req.body
    
            const udatedDevice =  await Device.update({name, price}, {where: {id}})
    
            return res.json({message: "device updated"})
        } catch (e) {
            next(e)
            
        }
    }
    

    // //delete a todo

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const device = await Device.destroy({ where: { id } });
            return res.json({message:'device deleted'})
        } catch (e) {
            next(e)
        }
    } 
}


module.exports = new DeviceController()