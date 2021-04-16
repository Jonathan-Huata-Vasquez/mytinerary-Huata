const express = require('express');
//de la libreria express ejecura el metodo Route(), guardo el enrutador que genera Route() en router
//esta es la constante que se llama en server.js
const router = express.Router();
const citiesControllers = require('../controllers/citiesControllers')
const validador = require('../config/validador')

const {obtenerTodasLasCiudades,agregarCiudad,obtenerCiudad,borrarCiudad,actualizarCiudad,
    obtenerJSONCiudadesIniciales,agregarArrayCiudades} = citiesControllers;

/*cuando te hagan un pedido a /api/tareas , si es tipo GET ejecuta este controlador, 
sino si es POST ejecuta el controlador....*/
router.route('/cities')
.get(obtenerTodasLasCiudades)
.post(validador,agregarCiudad)

//con los ":" le estamos diciendo que despues de la barra le va a venir algo dinamico
router.route('/cities/:id')
.get(obtenerCiudad)
.delete(borrarCiudad)
.put(actualizarCiudad)


/*Para ayudar al programador */
router.route('/backend/cities')
.get(obtenerJSONCiudadesIniciales)
.post(agregarArrayCiudades)

module.exports = router;


