const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT =(req,res=response,next)=>{

	const token = req.header('x-apiKey');

	if (!token) {
		return res.status(401).json({
			ok:false,
			msg:'error en el token'
		});
	}

	try {
        
		const {uid,name}=jwt.verify(token, process.env.Secret_Jwt_Seed);
		req.uid=uid;
		req.name=name;

	} catch (error) {
		return res.status(401).json({
			ok:false,
			msg:'token invalido'
		});
	}
	next();
};
module.exports={
	validarJWT
};