import { useEffect } from "react";
import { useLocation } from "react-router";

 const ScrollToTop = () => {
  const { pathname } = useLocation();
  //useLocation() es un hook de react-router-dom que devuelve un objeto con variables
  //entre ellas esta el pathname que es la url actual que esta en la barra 
  //este use effect se activara cada que cambia esa url , y srolleara a la posicion (0,0)
  useEffect(() => {
    window.onbeforeunload = function () { //para que se scrolle antes de refrescar la pagina
      window.scrollTo(0, 0);
    }
    window.scrollTo(0,0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;