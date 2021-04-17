import React from 'react';
import Home from './pages/Home.js'
import Cities from './pages/Cities.js'
import Error404 from './pages/Error404.js'
import City from './pages/CityItineraries'
import './App.css'
import {BrowserRouter,Redirect,Switch,Route} from 'react-router-dom'
import Header from './components/headerComponentes/Header'
import Footer from './components/Footer.js';
import ScrollToTop from './components/ScrollToTop'
class App extends React.Component{
    
    render(){
        return(
            <BrowserRouter>
                <ScrollToTop />
                <div className = "bg-dark text-white contenidoBody">
                <Header />
                <Switch>
                    <Route exact path ="/" component = {Home}/>
                    <Route exact path = "/cities" component = {Cities}/>
                    <Route path="/cities/:id" component = {City}/>
                    <Route path = "/error" component = {Error404}/>
                    <Redirect to ="/error" />
                </Switch>
                <Footer />
                </div>
            </BrowserRouter>        
        )
    }

}
export default App;