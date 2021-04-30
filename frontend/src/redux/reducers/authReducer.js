const inicialState ={
    usuarioLogueado : null,
}

const authReducer = (state = inicialState, action) =>{
    switch(action.type){
        case "LOGUEAR_USER":
            localStorage.setItem("usuarioLogueado",JSON.stringify(action.payload));
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