require('dotenv').config()
const express = require('express') 
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload') 
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//Обработка ошибок, последний Middleware
app.use(errorHandler)


const options = {

    definition: {
        openapi: '3.0.0',
        info: {
            title: "Device",
            version: "1.0.0",
            description: "This is About Device",
        },
        servers: [
            {
                url: ["http://localhost:5000"],
            },
        ],
    },
    apis: ['./index*.js'], 
};


swaggerSpecs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    //get 
    /**  
    *@swagger
    * tags:
    *  name: MainDevice
    *  description: This is for the main Device
    * /api/device:
    *  get:
    *      tags: [MainDevice]
    *      parameters:
    *          - name: text
    *            default: 1
    *            in: query
    *            schema:
    *              type: integer
    *      responses:
    *          default:
    *              description: This is the default response for it
    */

    //delete
    /**  
    *@swagger
    * tags:
    *  name: MainDevice
    *  description: This is for the main Device
    * /api/device:
    *  delete:
    *      tags: [MainDevice]
    *      parameters:
    *          - name: text
    *            default: 1
    *            in: query
    *            schema:
    *              type: integer
    *      responses:
    *          default:
    *              description: This is the default response for it
    */
    

    //post
    /**  
    *@swagger
    * tags:
    *  name: MainDevice
    *  description: This is for the main Device
    * /api/device:
    *  post:
    *      tags: [MainDevice]
    *      parameters:
    *          - name: text
    *            default: 1
    *            in: query
    *            schema:
    *              type: integer
    *      responses:
    *          default:
    *              description: This is the default response for it
    */

    //patch
    /**  
    *@swagger
    * tags:
    *  name: MainDevice
    *  description: This is for the main Device
    * /api/device:
    *  patch:
    *      tags: [MainDevice]
    *      parameters:
    *          - name: text
    *            default: 1
    *            in: query
    *            schema:
    *              type: integer
    *      responses:
    *          default:
    *              description: This is the default response for it
    */



const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e){
        console.log(e);
    }
}

start()