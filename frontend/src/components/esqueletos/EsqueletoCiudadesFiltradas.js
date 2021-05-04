import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const EsqueletoCiudadesFiltradas = () => {
    
    return (
        <div className="portaCiudadadesFiltradas">
            <SkeletonTheme color="#eceff1"  highlightColor ="#90caf9">
                <Skeleton duration={0.25}  width="40vw" height="30vh" className="esqueletoFotoCiudadCities" />
                <Skeleton duration={0.25}  width="40vw" height="30vh" className="esqueletoFotoCiudadCities" />
                <Skeleton duration={0.25}  width="40vw" height="30vh" className="esqueletoFotoCiudadCities" />
                <Skeleton duration={0.25}  width="40vw" height="30vh" className="esqueletoFotoCiudadCities" />
            </SkeletonTheme>
        </div>
    )
}

export default EsqueletoCiudadesFiltradas;