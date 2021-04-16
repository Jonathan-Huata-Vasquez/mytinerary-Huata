import React from 'react'

class City extends React.Component{
    render(){
        console.log(this.props)
        return(
            <h1>Tengo el ID :{} </h1>           
        );
    }
}
export default City;