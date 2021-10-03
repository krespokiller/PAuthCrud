const express = require ('express');
const cors = require('cors');
const path = require('path');
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
app.get('*', (req,res)=>{
	res.sendFile(path.resolve(__dirname,'public/index.html'));
});


app.set('port', (process.env.PORT || 29898));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
	var result = 'App is running';
	response.send(result);
}).listen(app.get('port'), function() {
	console.log('App is running, server is listening on port ', app.get('port'));
});