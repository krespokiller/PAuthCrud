const express = require ('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// crear el servidor/aplicacion de express
const app = express();

//coneccion a base de datos
dbConnection();

//directorio publico
app.use(express.static('public'));

//cors 
app.use(cors());

//transformar body
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.puerto, ()=>{
	console.log(`Runing in ${process.env.puerto}`);
});