const jwt = require('jsonwebtoken');
const generarJWT=(uid, name)=>{
	const payload ={uid,name};
	return new Promise((resolve,reject)=>{
		jwt.sign(payload,process.env.Secret_Jwt_Seed,{
			expiresIn:'24h'
		}, (err,token)=>{
			if (err) {
				console.log(err);
				reject(err);
			}else{
				resolve (token);
			}
		});
	});

};
module.exports={
	generarJWT
};