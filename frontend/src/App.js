import React from 'react';
import Home from './pages/Home.js'
import Cities from './pages/Cities.js'
import SignUp from './pages/SignUp.js'
import LogIn from './pages/LogIn.js'
import Error404 from './pages/ErrorHTTP/Error404'
import Error500 from './pages/ErrorHTTP/Error500'
import City from './pages/CityItineraries'
import './App.css'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import Header from './components/headerComponentes/Header'
import Footer from './components/Footer.js';
import ScrollToTop from './components/ScrollToTop'
import {connect} from 'react-redux'
import authActions from './redux/actions/authActions.js';
class App extends React.Component {
 
    render() {
        const token = localStorage.getItem("token");
        if(!this.props.usuarioLogueado && token && token !== "undefined"){
            this.props.logueoForzadoPorLS(JSON.parse(token))
        }

        return (
            <BrowserRouter>
                <ScrollToTop />
                <div className="bg-dark text-white contenidoBody">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/cities" component={Cities} />
                        {!this.props.usuarioLogueado && [
                            <Route path="/signup" component={SignUp} key="/signup"/>,
                            <Route path="/login" component={LogIn} key="/login"/>
                        ]}
                        
                        <Route path="/cities/:id" component={City} />
                        <Route path="/error404" component={Error404} />
                        <Route path="/error500" component={Error500} />
                        <Redirect to="/" />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }

}
const mapStateToProps = (state) =>{
    return {
        usuarioLogueado : state.authReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    logueoForzadoPorLS: authActions.logueoForzadoPorLS
}

export default connect(mapStateToProps,mapDispatchToProps)(App);