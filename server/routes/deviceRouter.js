const Router = require('express')
const router = new Router()
const DeviceController = require('../controllers/deviceController')

router.post('/', DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)
router.patch('/:id', DeviceController.update)
router.delete('/:id', DeviceController.delete)


module.exports = router