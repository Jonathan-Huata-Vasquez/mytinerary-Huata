import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {connect} from 'react-redux'
import cityItineraryActions from '../../redux/actions/cityItineraryAction'
import {mostrarTostada,mostrarTostadaError500} from '../../helpers/tostadas'
const useStyle = makeStyles({
    estiloTextField: {
        backgroundColor: "white",
        borderRadius: "5px",
        marginTop: "1em"
    },
    estiloSendSVG: {
        color: "#5994ce",
    },
});

const CajaComentario = ({ idItinerario,comentarios, usuarioLogueado ,agregarComentario }) => {
    //console.log(comentarios)
    const misEstilos = useStyle();

    const [comentarioAPostear,setComentarioAPostear] = useState("");
    const [comentarioAEditar,setComentarioAEditar] = useState({
            idItinerario: "",
    })

    const leerInputPostear = (e)=>{
        setComentarioAPostear(e.target.value)
    }

    const postearComentario = async () =>{
        
        console.log(comentarioAPostear)
        if(!usuarioLogueado) {
            return  mostrarTostada("info","You must be logged in to comment it");
        }

        try{
            agregarComentario(idItinerario,usuarioLogueado.token,comentarioAPostear)
            setComentarioAPostear("")
        }catch(e){
            console.log(e);
            mostrarTostadaError500();
        }
        

    }

    return (
        <div className="contenedorCajaComentario" style={{ backgroundImage: "url(/assets/fondoComentarios.png)" }}>
            <div className="TodosLosComentarios">
                {comentarios.map((unComentario) => {
                    let nombreCompleto = unComentario.usuarioId.nombre + " " + unComentario.usuarioId.apellido;
                    return (
                        <div className="portaAvatarComentario" key={unComentario._id}>
                            <div className="avatar" style={{ backgroundImage: `url(${unComentario.usuarioId.usuarioAvatar})` }}></div>
                            <div className="portaNombreUsuarioYComentario" >
                                <div className ="portaNombreUsuarioYOpcionesComentario">
                                    <div className= "espacioNombreUsuarioComentario"><h5>{nombreCompleto}</h5></div>
                                    <div className = "opcionesComentarios">
                                        <EditIcon  />
                                        <DeleteIcon />
                                    </div>
                                </div>
                                <div className="comentario">
                                    <span> {unComentario.comentario}</span>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="formularioComentario">
                <FormControl variant="outlined" className={misEstilos.estiloTextField} fullWidth={true} size="small">
                    <OutlinedInput
                        rowsMax={4}
                        multiline={true}
                        type='text'
                        value={comentarioAPostear}
                        onChange={(e)=>leerInputPostear(e)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={postearComentario}
                                    edge="end"
                                >
                                    <SendIcon className={misEstilos.estiloSendSVG} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        usuarioLogueado : state.authReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    agregarComentario : cityItineraryActions.agregarComentario
}


export default connect(mapStateToProps,mapDispatchToProps)(CajaComentario);