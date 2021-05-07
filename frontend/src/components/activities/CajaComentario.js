import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux'
import cityItineraryActions from '../../redux/actions/cityItineraryAction'
import { mostrarTostada, mostrarTostadaError500 } from '../../helpers/tostadas'
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

const CajaComentario = ({ idItinerario, comentarios, usuarioLogueado, agregarComentario, borrarComentario }) => {
    //console.log(comentarios)
    const misEstilos = useStyle();

    const [comentarioAPostear, setComentarioAPostear] = useState("");
    const [comentarioAEditar, setComentarioAEditar] = useState({
        idItinerario: "",
    })

    const leerInputPostear = (e) => {
        setComentarioAPostear(e.target.value)
    }

    const postearComentario =  () => {
        console.log(comentarioAPostear)
        if (!usuarioLogueado)
            return mostrarTostada("info", "You must be logged in to comment it");

        //try {
            agregarComentario(idItinerario, usuarioLogueado.token, comentarioAPostear)
            setComentarioAPostear("")
        /*} catch (e) {
            console.log(e);
            mostrarTostadaError500();
        }*/
    }

    const solicitarBorrarComentario = (e) => {
        //console.log(e.currentTarget.dataset.idcomentario)
        const idComentario =e.currentTarget.dataset.idcomentario
        //idcomentario
        //if(!usuarioLogueado) return mostrarTostada("")
        console.log("el comentaio seleccionado es: ",comentarios.find(comentario => comentario._id === idComentario))
        borrarComentario(idItinerario,usuarioLogueado.token,e.currentTarget.dataset.idcomentario)
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
                                <div className="portaNombreUsuarioYOpcionesComentario">
                                    <div className="espacioNombreUsuarioComentario"><h5>{nombreCompleto}</h5></div>
                                    <div className="opcionesComentarios">
                                        <IconButton
                                            //onClick={(e)=>borrarComentario(e)}
                                            edge="end"
                                            size="small"
                                            //onClick={(e) => solicitarBorrarComentario(e)} data-tipoingreso="editar"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            size="small"
                                            onClick={(e) => solicitarBorrarComentario(e)} 
                                            data-idcomentario ={unComentario._id}
                                            name="nombre"
                                        >
                                            <DeleteIcon />
                                        </IconButton>


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
                        onChange={(e) => leerInputPostear(e)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
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
const mapStateToProps = (state) => {
    return {
        usuarioLogueado: state.authReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    agregarComentario: cityItineraryActions.agregarComentario,
    borrarComentario: cityItineraryActions.borrarComentario
}


export default connect(mapStateToProps, mapDispatchToProps)(CajaComentario);