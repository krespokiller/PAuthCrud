const Mongoose = require('mongoose');

const dbConnection = async()=>{

	await Mongoose.connect(process.env.DB_CNN,
		(err)=>{
			(err)
				?console.error(err)
				:console.log('Conectado');
		});

};
module.exports={
	dbConnection
};