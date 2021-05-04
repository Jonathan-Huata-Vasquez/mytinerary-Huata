import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';


import MiSlide from './MiSlide.js'



const MiCarousel = ({gruposCiudades}) => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false); //esto es para evitar usar los controles manuales mientras esta la animacion de cambio de slide

  const next = () => {  //actualiza el indexActual (el estado) al siguiente o a 0 si esta en el ultimo slide
    if (animating) return;
    const nextIndex = activeIndex === gruposCiudades.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => { //actualiza el indexActual (el estado) al anterior o al ultimo de los slide si esta en el primer slide
    if (animating) return;
    const nextIndex = activeIndex === 0 ? gruposCiudades.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  //Este nos actualizara el indece actual al pasado por parametro (si no se esta animando)
  //nos servira para las franjas que nos dibuja <CarouselIndicators />
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  //un array de CarouselItem que se inyectan en <Caroucel>
  const slides = gruposCiudades.map((unGrupoCiudades,indice) => {
    return (
      <CarouselItem
        //onExiting y onExited Es de React Transition Group
        //les damos a cada Item del carrousel por props los metodos(como funcion callback) que usara intenamente Hacer las animaciones
        //asi cuando esta usando una animacion de cambio de slide , cambie nuestro estado animating
        //lo mismo cuando termina la animacion
        onExiting={() => setAnimating(true)}  
        onExited={() => setAnimating(false)}
        key={indice}
      >
        {/*Le colocamos como contenido del item , un slide propio  */}
        <MiSlide grupoCiudades ={unGrupoCiudades}/>
      </CarouselItem>
    );
  });
  
  
  //esto es para que no nos tire error internamente Reacstrap de hijos de una lista contenga unica key
  let keysGruposCiudades = gruposCiudades.map(unGrupoCiudades => JSON.stringify(unGrupoCiudades));

  return (
    <div className ="MiCarrouselEstilo">
      <Carousel
        activeIndex={activeIndex}
        next={next} // para agregarle funcionalidad a los botones del teclado
        previous={previous} //
        interval = {3000}
      >
        {/*CarouselIndicador nos dibujara una cantidad CarouselItem en franjas y brillara la fraja relacionada al actual item 
        Tambien le agregara funcionalidades a las franjas de que al clickear una , le cambie el estado de nuestro activeIndex
        al indice que tiene esa franja
        */}
        
        <CarouselIndicators items={keysGruposCiudades} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {/*inyectamos nuestros CarouselItem armados anteriormente */}
        {/*slides*/}
        {slides}
        {/*Colocamos los botones de anterior y y le pasamos por props (lo mas importante) la funcion que cambia nuestro estado del indexActual */}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>

  );
}

export default MiCarousel;