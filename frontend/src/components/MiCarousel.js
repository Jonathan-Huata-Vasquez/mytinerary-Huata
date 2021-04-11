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

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  //un array de CarouselItem que se inyectan en <Caroucel>
  const slides = gruposCiudades.map((unGrupoCiudades,indice) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={indice}
      >
      <MiSlide grupoCiudades ={unGrupoCiudades}/>
      </CarouselItem>
    );
  });
  
  let arrayNuevo = gruposCiudades.map(unGrupoCiudades => JSON.stringify(unGrupoCiudades));

  return (
    <div className ="MiCarrouselEstilo">
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval = {2000}
      >
        <CarouselIndicators items={arrayNuevo} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </div>

  );
}

export default MiCarousel;