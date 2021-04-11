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
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === gruposCiudades.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? gruposCiudades.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  //un array de CarouselItem que se inyectran en <Caroucel>
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