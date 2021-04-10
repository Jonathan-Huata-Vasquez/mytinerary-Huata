import { Container, Row, Col, } from 'reactstrap';
const Footer = () => {

    return (
        <footer className="pt-5 mt-5">
            <Container fluid={true}>
                <Row>
                    <Col xs="12" lg="4" className="d-flex flex-column align-items-center mt-3">
                        <img src="./assets/logoCompleto2.png" style={{ width: "18vw", minWidth: "200px" }}></img>
                        <h1>MyTinerary</h1>
                    </Col>
                    <Col xs="12" lg="4" className="d-flex flex-column align-items-center mt-3">
                        <hr style = {{borderColor : "white",width : "50%"}} className ="d-lg-none "></hr>
                        <h4>Navegation</h4>
                        <h5 className="mt-3">Home</h5>
                        <h5 className="mt-3">City</h5>
                    </Col>
                    <Col xs="12" lg="4" className="d-flex flex-column align-items-center mt-3">
                        <hr style = {{borderColor : "white",width : "50%"}} className ="d-lg-none "></hr>
                        <h4>WE ARE SOCIAL!</h4>
                        <div className="d-flex justify-content-between mt-3 w-50">
                            <div className="social" style={{ backgroundImage: `url(./assets/footer/facebook.png` }}></div>
                            <div className="social" style={{ backgroundImage: `url(./assets/footer/twitter.png` }}></div>
                            <div className="social" style={{ backgroundImage: `url(./assets/footer/google.png` }}></div>
                            <div className="social" style={{ backgroundImage: `url(./assets/footer/youtube.png` }}></div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="d-flex justify-content-center align-items-center bg-secondary mt-3">
                <h4>MYTINERARY ALL RIGHTS RESERVED ©</h4>
            </div>
        </footer>
    )
}
export default Footer;