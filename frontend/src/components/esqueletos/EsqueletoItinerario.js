
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const EsqueletoItinerario = () => {
    return (

        <SkeletonTheme color="#eceff1" highlightColor="#90caf9">
            <div className="contenedorItinerario">
                <Skeleton duration={0.25} width="60vw" height="20px" />
                <Skeleton duration={0.25} circle={true} height="10vw" width="10vw"  className="mt-3"/>
                <Skeleton duration={0.25} width="50vw" height="20px" className="mt-3" />

                <div className="portaPrecioDuracion mt-3 w-100">
                    <Skeleton duration={0.25} width="15vw" height="20px"  />
                    <Skeleton duration={0.25} width="15vw" height="20px" />
                </div>
                <div className="portaPrecioDuracion mt-1 w-100">
                    <Skeleton duration={0.25} width="15vw" height="20px"  />
                    <Skeleton duration={0.25} width="15vw" height="20px" />
                </div>

                <div className="portalikesHashtags mt-3">
                    <Skeleton duration={0.25} width="10vw" height="10px" />
                    <Skeleton duration={0.25} width="60vw" height="10px" className="mt-3" />
                </div>
            </div>
        </SkeletonTheme>

    )
}
export default EsqueletoItinerario;