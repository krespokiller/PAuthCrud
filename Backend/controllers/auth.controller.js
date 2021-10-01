const {response}= require('express');
const Usuario=require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../util/jwt');


//crear usuario
const crearusuario = async(req,res = response)=>{

	const {name,email,password}=req.body;

	try {
		//verificar si existe el mismo correo
		let usuario = await Usuario.findOne({email:email});
		if (usuario){ 
			return res.status(400).json({
				ok:false,
				msg:'El usuario ya existe'
			});}

		//crear usuario con el modelo
		const dbUser = new Usuario(req.body);

		//Encriptar la contraseña, (hash)
		const salt = bcrypt.genSaltSync();
		dbUser.password=bcrypt.hashSync(password,salt);

		//generar JWT
		const token = await generarJWT(dbUser.id,name);

		// crear usuario de la db
		await dbUser.save();

		//Generar la respuesta exitosa
		return res.status(201).json({
			ok:true,
			uid:dbUser.id,
			name,
			token
		});

	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok:false,
			msg:'Por favor hable con el administrador'
		});
	}

};

// renovar contraseña
const renovartoken = async(req,res = response)=>{

	const {uid,name}=req;
	//generar JWT
	const token = await generarJWT(uid,name);
	res.json({
		ok: true,
		msg: 'renovar renovartoken al pelo',
		uid,
		name,
		token
	});
};

//login usuario
const loginusuario = async(req,res= response)=>{

	const {email,password}=req.body;
	try {

		//confirmar el correo electronico
		const dbUser = await Usuario.findOne({email:email});
		if( !dbUser ){
			return res.status(400).json({
				ok:false,
				msg:'El correo no existe'
			});
		}
		//confirmar el password
		const validPassword = bcrypt.compareSync(password, dbUser.password);
		if (!validPassword) {
			return res.status(400).json({
				ok:false,
				msg:'El password no es valido'
			});
		}
		//generar el JWT
		const token = await generarJWT(dbUser.id,dbUser.name);
		// Respuesta del servicio
		return res.json({
			ok:true,
			uid:dbUser.id,
			name: dbUser.name,
			token
		});


	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador'
		});
	}

};

module.exports={
	crearusuario:crearusuario,
	loginusuario:loginusuario,
	renovartoken:renovartoken
};