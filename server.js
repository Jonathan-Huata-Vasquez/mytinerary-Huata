require('dotenv').config();
require('./config/database');
const express = require(`express`);
const cors = require(`cors`);
const router = require('./routes/index');
require('./config/passport')


const app = express();
//frente a cualquier tipo de pedidos, aplica Cors, tengo que decirle a mi API, no bloquees pedidos a ninguno por la polisa de CORS
app.use(cors());

//Esto es para poder parsear el body de los objetos req
//frente a cualquier pedido de cualquier indole, usa la libreria express y aplica un metodo que se llama json()
app.use(express.json());

//Cuando te hagan un pedido de cualquier indole a una ruta que empieze con '/api', ejecuta router
app.use('/api',router);


//le especifico en que puerto 4000 estara escuchando, ejecutara la funcion callback una vez que que la app ya este cuchando en el puerto 4000
app.listen(4000, ()=> console.log("App escuchando en el puerto 4000"));
//El listen siempre va al final

//Al llegarme un pedido
//llega al router, el router va al index, cae en validador, pasa el validador, va a su correspondiente controlador

