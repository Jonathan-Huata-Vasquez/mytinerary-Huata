require('dotenv').config();
require('./config/database');
const express = require(`express`);
const cors = require(`cors`);
const router = require('./routes/index');
require('./config/passport')

//para consstruir rutas
const path = require('path')

const app = express();
//frente a cualquier tipo de pedidos, aplica Cors, tengo que decirle a mi API, no bloquees pedidos a ninguno por la polisa de CORS
app.use(cors());

//Esto es para poder parsear el body de los objetos req
//frente a cualquier pedido de cualquier indole, usa la libreria express y aplica un metodo que se llama json()
app.use(express.json());

//Cuando te hagan un pedido de cualquier indole a una ruta que empieze con '/api', ejecuta router
app.use('/api',router);

//en heroku tienen la variable de entorno NODE_ENV
if(process.env.NODE_ENV === "production"){
    //le decimos donde va a estar la carpèta publica con los archivos estaticos (los archivos que tiene que devolver al navegador)
    app.use(express.static('client/build'));

    //para cualquier pedido tipo get a cualquier ruta
    app.get("*",(req,res) => {
        //devolvemos  el archivo index.html
        res.sendFile(path.join(__dirname+"/client/build/index.html"))
    })
}

//en keroku tendran una variable de entorno port PERO no una de HOST
const host = process.env.HOST || "0.0.0.0"  //sino lo que heroku me asigne
const puerto = process.env.PORT;

//le especifico en que puerto  estara escuchando, ejecutara la funcion callback una vez que ya este escuchando en el puerto que le dijimos
app.listen(puerto, ()=> console.log("App escuchando en el puerto "+puerto+ " en "+host));
//El listen siempre va al final

//Al llegarme un pedido
//llega al router, el router va al index, cae en validador, pasa el validador, va a su correspondiente controlador

