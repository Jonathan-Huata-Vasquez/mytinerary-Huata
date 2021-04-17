import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  //useLocation() es un hook de react-router-dom que devuelve un objeto con variables
  //entre ellas esta el pathname que es la url actual que esta en la barra 
  //este use effect se activara cada que cambia esa url , y srolleara a la posicion (0,0)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}