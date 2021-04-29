const express = require('express');
//de la libreria express ejecura el metodo Route(), guardo el enrutador que genera Route() en router
//esta es la constante que se llama en server.js
const router = express.Router();
const citiesControllers = require('../controllers/citiesControllers');
const itinerariesControllers = require('../controllers/itinerariesControllers');
const validador = require('../config/validador')
const userControllers = require('../controllers/userControllers')
const {obtenerTodasLasCiudades,agregarCiudad,obtenerCiudad,borrarCiudad,actualizarCiudad,
    obtenerJSONCiudadesIniciales,agregarArrayCiudades} = citiesControllers;

const {validadorCampoVacio} = validador;




/*cuando te hagan un pedido a /api/tareas , si es tipo GET ejecuta este controlador, 
sino si es POST ejecuta el controlador....*/
router.route('/cities')
.get(obtenerTodasLasCiudades)
.post(validadorCampoVacio,agregarCiudad)

//con los ":" le estamos diciendo que despues de la barra le va a venir algo dinamico, estara guardado con el nombre "id" en req.params
router.route('/cities/:id')
.get(obtenerCiudad)
.delete(borrarCiudad)
.put(actualizarCiudad)

//------------------------------------------------
const {agregarItinerario,obtenerTodosItinerarios,obtenerItinerarioPorId,
    obtenerItinerarioPorCiudad,actualizarItinerario,borrarItinerario} = itinerariesControllers;


router.route('/itineraries')
.get(obtenerTodosItinerarios)
.post(agregarItinerario)

router.route('/itineraries/:id')
.get(obtenerItinerarioPorId)
.put(actualizarItinerario)
.delete(borrarItinerario)

router.route('/itineraries/city/:id')
.get(obtenerItinerarioPorCiudad)

//------------------------------------
const {crearUsuario,loguearUsuario} = userControllers;

router.route('/user/signup')
.post(crearUsuario)

router.route("/user/login")
.post(loguearUsuario)








/*Para ayudar al programador */
router.route('/backend/cities')
.post(obtenerJSONCiudadesIniciales)
.get(agregarArrayCiudades)

module.exports = router;


