import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//index.js quedara asi generalmente

//aqui lo que se hace es agarrar el componente App y lo reenderiza en el div con id root
//App va a ser el contenedor padre de todos , la caja mas grande, entro de app voy a tener componentes
//
ReactDOM.render(
  //tranquilamente puede haber h1 con algun texto aqui
    <App />
  ,
  document.getElementById('root')
);


