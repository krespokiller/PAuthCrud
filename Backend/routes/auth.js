const {Router} = require('express');
const { check } = require('express-validator');
const { crearusuario, loginusuario, renovartoken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();


//crear nuevo usuario
router.post('/register', [
	check('name','El nombre es obligatorio').not().isEmpty(),
	check('email','El email es obligatorio').isEmail(),
	check('password','El password es obligatorio').isLength({ min:6 }),
	validarCampos
],crearusuario);

//Login nuevo usuario
router.post('/', [
	check('email','El email es obligatorio').isEmail(),
	check('password','El password es obligatorio').isLength({ min:6 }),
	validarCampos
], loginusuario );

//Validar token
router.get('/renew',validarJWT,renovartoken);

module.exports = router;