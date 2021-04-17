import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const EsqueletoCiudadesFiltradas = () => {
    let a;
    a = a || 20
    console.log(a)
    return (
        <div className="portaCiudadadesFiltradas">
            <SkeletonTheme color="#eceff1"  highlightColor ="#90caf9">
                <Skeleton  width="40vw" height="30vh" className="esqueletoFotoCiudadCities" />
                <Skeleton  width="40vw" height="30vh" className="esqueletoFotoCiudadCities" />
                <Skeleton  width="40vw" height="30vh" className="esqueletoFotoCiudadCities" />
                <Skeleton  width="40vw" height="30vh" className="esqueletoFotoCiudadCities" />
            </SkeletonTheme>
        </div>
    )
}

export default EsqueletoCiudadesFiltradas;