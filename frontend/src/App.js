import React from 'react';
import Home from './pages/Home.js'
import City from './pages/City.js'
import Error404 from './pages/Error404.js'
import './App.css'
import {BrowserRouter,Redirect,Switch,Route} from 'react-router-dom'

class App extends React.Component{
    
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path ="/" component = {Home}/>
                    <Route path = "/City" component = {City}/>
                    <Route path = "/error" component = {Error404}/>
                    <Redirect to ="/error" />
                </Switch>
            </BrowserRouter>        
        )
    }

}
export default App;