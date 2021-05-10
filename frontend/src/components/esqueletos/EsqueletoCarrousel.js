import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const EsqueletoCarrouselActivities = () => {
    return (
        <SkeletonTheme color="#eceff1" highlightColor="#90caf9">
            <Skeleton duration={0.25} width="60vw" height="40vh" />
        </SkeletonTheme>
    )
}

export default EsqueletoCarrouselActivities;