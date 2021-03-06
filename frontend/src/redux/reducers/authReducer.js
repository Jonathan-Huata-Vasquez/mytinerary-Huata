const inicialState ={
    usuarioLogueado : null,
}

const authReducer = (state = inicialState, action) =>{
    switch(action.type){
        case "LOGUEAR_USER":
            localStorage.setItem("token",JSON.stringify(action.payload.token));
            return {
                ...state,
                usuarioLogueado : action.payload  
            };
        case "DESLOGUEAR_USER":
            localStorage.clear();
            return {
                ...state,
                usuarioLogueado:null
            }
        default: 
            return state;
    }
}
export default authReducer;