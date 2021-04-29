const inicialState ={
    usuarioLogueado : null,
}

const authReducer = (state = inicialState, action) =>{
    switch(action.type){
        case "LOGUEAR_USER":
            return {
                ... state,
                usuarioLogueado : action.payload
            };
        default:
            return state;
    }
}
export default authReducer;