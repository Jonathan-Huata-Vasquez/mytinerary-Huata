const express = require('express');
//de la libreria express ejecura el metodo Route(), guardo el enrutador que genera Route() en router
//esta es la constante que se llama en server.js
const router = express.Router();
const citiesControllers = require('../controllers/citiesControllers');
const itinerariesControllers = require('../controllers/itinerariesControllers');
const userControllers = require('../controllers/userControllers')
const activiesControllers = require("../controllers/activitiesControllers");
const passport = require('passport')
const validador = require('../config/validador')

const {obtenerTodasLasCiudades,agregarCiudad,obtenerCiudad,borrarCiudad,actualizarCiudad,
    obtenerJSONCiudadesIniciales,agregarArrayCiudades} = citiesControllers;

/*cuando te hagan un pedido a /api/tareas , si es tipo GET ejecuta este controlador, 
sino si es POST ejecuta el controlador....*/
router.route('/cities')
.get(obtenerTodasLasCiudades)
.post(agregarCiudad)

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

//---------------Usuario---------
const {crearUsuario,loguearUsuario,loginForzado} = userControllers;

router.route('/user/signup')
.post(validador,crearUsuario)

router.route("/user/login")
.post(loguearUsuario)

//------------ValidacionToken---------

router.route('/user/loginLS')
.get(passport.authenticate('jwt',{session:false}),loginForzado)

//--------------Activity Routes--------------------------------
const {agregarActividad,obtenerActividades,obtenerActividadPorId,obtenerActividadesPorItinerario,actualizarActividad,borrarActividad} = activiesControllers;
router.route('/activities')
.get(obtenerActividades)
.post(agregarActividad)

router.route('/activities/:id')
.get(obtenerActividadPorId)
.put(actualizarActividad)
.delete(borrarActividad)

router.route("/activities/itinerary/:idItinerary")
.get(obtenerActividadesPorItinerario)

/*Para ayudar al programador */
router.route('/backend/cities')
.post(obtenerJSONCiudadesIniciales)
.get(agregarArrayCiudades)

module.exports = router;


